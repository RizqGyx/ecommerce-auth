import type { BlogPost, MembershipPlan, Product, Category, ClassSession, ClassType, Coach } from "@/generated/prisma";
import type { PricingFeature } from "@/components/molecules/PricingCard";

const LEVEL_LABELS: Record<string, string> = {
  ALL_LEVELS: "All Levels",
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

export function toBlogPostData(post: BlogPost) {
  return {
    ...post,
    author: post.authorName,
    publishedAt: (post.publishedAt ?? post.createdAt).toISOString(),
  };
}

export function toPricingCardData(plan: MembershipPlan) {
  return {
    ...plan,
    tagline: plan.description,
    color: plan.color ?? "from-primary/80 to-accent/80",
    borderColor: plan.borderColor ?? "border-primary/30",
    features: plan.features as unknown as PricingFeature[],
  };
}

export function toProductData(product: Product & { category: Category | null }) {
  return {
    ...product,
    category: product.category?.name ?? "Uncategorized",
    reviews: product.reviewsCount,
  };
}

type ScheduleSessionRow = ClassSession & {
  classType: ClassType;
  coach: Coach;
  _count: { registrations: number };
};

export function toScheduleSession(session: ScheduleSessionRow) {
  return {
    id: session.id,
    time: session.startTime,
    endTime: session.endTime,
    class: session.classType.name,
    coach: session.coach.name,
    room: session.room ?? "",
    capacity: session.capacity,
    enrolled: session._count.registrations,
    price: session.price,
    level: LEVEL_LABELS[session.classType.level] ?? session.classType.level,
    color: session.classType.color ?? "from-primary to-accent",
  };
}
