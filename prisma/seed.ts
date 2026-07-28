import { PrismaClient } from "../src/generated/prisma";
import { hash } from "bcrypt-ts";
import {
  CLASS_TYPES,
  COACHES,
  SCHEDULE,
  MEMBERSHIP_PLANS,
  PRODUCTS,
  BLOG_POSTS,
} from "../src/lib/data";

const prisma = new PrismaClient();

const ADMIN_EMAIL = "admin@s-onegym.id";
const ADMIN_PASSWORD = "admin123";

const WEEKDAY_INDEX: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function nextDateForWeekday(dayName: string, from: Date): Date {
  const target = WEEKDAY_INDEX[dayName];
  const date = new Date(from);
  date.setHours(0, 0, 0, 0);
  const diff = (target - date.getDay() + 7) % 7;
  date.setDate(date.getDate() + diff);
  return date;
}

async function main() {
  console.log("Seeding database...");

  // ── Admin user ──────────────────────────────────────────────────────────
  const hashedPassword = await hash(ADMIN_PASSWORD, 10);
  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: { password: hashedPassword, emailVerified: new Date(), role: "ADMIN" },
    create: {
      name: "S-One Gym Admin",
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });
  console.log(`Admin user ready: ${admin.email}`);

  // ── Categories + Products ───────────────────────────────────────────────
  const categoryNames = Array.from(new Set(PRODUCTS.map((p) => p.category)));
  const categories = new Map<string, string>();
  for (const name of categoryNames) {
    const category = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    categories.set(name, category.id);
  }

  for (const product of PRODUCTS) {
    const data = {
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice ?? null,
      imageUrl: product.imageUrl,
      rating: product.rating,
      reviewsCount: product.reviews,
      badge: product.badge ?? null,
      categoryId: categories.get(product.category)!,
      userId: admin.id,
    };
    await prisma.product.upsert({
      where: { id: `seed-${product.id}` },
      update: data,
      create: { id: `seed-${product.id}`, ...data },
    });
  }
  console.log(`Seeded ${PRODUCTS.length} products across ${categories.size} categories`);

  // ── Coaches ──────────────────────────────────────────────────────────────
  const coachIdBySlug = new Map<string, string>();
  for (const coach of COACHES) {
    const data = {
      name: coach.name,
      title: coach.title,
      bio: coach.bio,
      imageUrl: coach.imageUrl,
      specialties: coach.specialties,
      certifications: coach.certifications,
      experience: coach.experience,
      instagram: coach.instagram,
      featured: coach.featured,
      isPersonalTrainer: coach.isPersonalTrainer,
      pricePerSession: coach.pricePerSession ?? null,
      achievements: coach.achievements ?? null,
    };
    const record = await prisma.coach.upsert({
      where: { slug: coach.slug },
      update: data,
      create: { slug: coach.slug, ...data },
    });
    coachIdBySlug.set(coach.name, record.id);
  }
  console.log(`Seeded ${COACHES.length} coaches`);

  // ── Class types ──────────────────────────────────────────────────────────
  const classTypeIdByName = new Map<string, string>();
  for (const classType of CLASS_TYPES) {
    const data = {
      name: classType.name,
      description: classType.description,
      duration: classType.duration,
      color: classType.color,
      colorSolid: classType.colorSolid,
      icon: classType.icon,
      benefits: classType.benefits,
    };
    const record = await prisma.classType.upsert({
      where: { slug: classType.slug },
      update: data,
      create: { slug: classType.slug, ...data },
    });
    classTypeIdByName.set(classType.name, record.id);
  }
  console.log(`Seeded ${CLASS_TYPES.length} class types`);

  // ── Class sessions (project weekly SCHEDULE onto the next 7 real days) ──
  const today = new Date();
  let sessionCount = 0;
  for (const [dayName, sessions] of Object.entries(SCHEDULE)) {
    const date = nextDateForWeekday(dayName, today);
    for (const session of sessions) {
      const classTypeId = classTypeIdByName.get(session.class);
      const coachId = coachIdBySlug.get(session.coach);
      if (!classTypeId || !coachId) continue;

      const data = {
        classTypeId,
        coachId,
        date,
        startTime: session.time,
        endTime: session.endTime,
        capacity: session.capacity,
        price: session.price,
        room: session.room,
        status: "UPCOMING" as const,
      };
      await prisma.classSession.upsert({
        where: { id: `seed-${session.id}` },
        update: data,
        create: { id: `seed-${session.id}`, ...data },
      });
      sessionCount++;
    }
  }
  console.log(`Seeded ${sessionCount} class sessions`);

  // ── Membership plans ────────────────────────────────────────────────────
  for (const plan of MEMBERSHIP_PLANS) {
    const data = {
      name: plan.name,
      price: plan.price,
      description: plan.tagline,
      features: plan.features,
      popular: plan.popular,
      color: plan.color,
      borderColor: plan.borderColor,
    };
    await prisma.membershipPlan.upsert({
      where: { slug: plan.id },
      update: data,
      create: { slug: plan.id, ...data },
    });
  }
  console.log(`Seeded ${MEMBERSHIP_PLANS.length} membership plans`);

  // ── Blog posts ───────────────────────────────────────────────────────────
  for (const post of BLOG_POSTS) {
    const data = {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl,
      authorId: admin.id,
      authorName: post.author,
      readTime: post.readTime,
      category: post.category as
        | "NEWS"
        | "TIPS"
        | "NUTRITION"
        | "WORKOUT"
        | "EVENTS",
      published: true,
      featured: post.featured,
      publishedAt: new Date(post.publishedAt),
    };
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: data,
      create: { slug: post.slug, ...data },
    });
  }
  console.log(`Seeded ${BLOG_POSTS.length} blog posts`);

  console.log("\nSeed complete.");
  console.log(`Admin login -> email: ${ADMIN_EMAIL} / password: ${ADMIN_PASSWORD}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
