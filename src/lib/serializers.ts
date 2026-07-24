import type {
  BlogPost, MembershipPlan, Product, Category, ClassSession, ClassType, Coach,
  Order, OrderItem, ClassRegistration, PTBooking, Notification, Review, User,
} from "@/generated/prisma";
import type { PricingFeature } from "@/components/molecules/PricingCard";

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

export interface TransactionSummary {
  id: string;
  type: "shop" | "booking" | "pt";
  title: string;
  subtitle: string;
  total: number;
  status: string;
  createdAt: Date;
}

type OrderRow = Order & { items: (OrderItem & { product: Product })[] };

export function toOrderSummary(order: OrderRow): TransactionSummary {
  return {
    id: order.id,
    type: "shop",
    title: order.items.map((i) => i.product.name).join(", ") || "Pesanan Produk",
    subtitle: `${order.items.reduce((s, i) => s + i.quantity, 0)} produk`,
    total: order.total,
    status: order.status,
    createdAt: order.createdAt,
  };
}

type ClassRegistrationRow = ClassRegistration & {
  session: ClassSession & { classType: ClassType; coach: Coach };
};

export function toClassRegistrationSummary(reg: ClassRegistrationRow): TransactionSummary {
  return {
    id: reg.id,
    type: "booking",
    title: reg.session.classType.name,
    subtitle: `${reg.session.coach.name} · ${reg.session.date.toLocaleDateString("id-ID", { day: "numeric", month: "short" })}`,
    total: reg.session.price,
    status: reg.status,
    createdAt: reg.createdAt,
  };
}

type PTBookingRow = PTBooking & { coach: Coach };

export function toPtBookingSummary(pt: PTBookingRow): TransactionSummary {
  return {
    id: pt.id,
    type: "pt",
    title: `Paket ${pt.packageName}`,
    subtitle: `${pt.coach.name} · ${pt.sessionsUsed}/${pt.sessionsTotal} sesi`,
    total: pt.price,
    status: pt.status,
    createdAt: pt.createdAt,
  };
}

export function relativeTimeLabel(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Kemarin";
  if (days < 7) return `${days} hari lalu`;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export interface NotificationView {
  id: string;
  type: Notification["type"];
  title: string;
  body: string;
  time: string;
  read: boolean;
  starred: boolean;
  isVirtual: boolean;
}

export function toNotificationView(n: Notification): NotificationView {
  return {
    id: n.id,
    type: n.type,
    title: n.title,
    body: n.body,
    time: relativeTimeLabel(n.createdAt),
    read: n.read,
    starred: n.starred,
    isVirtual: false,
  };
}

type ReviewRow = Review & {
  user: User;
  product: Product | null;
  classSession: (ClassSession & { classType: ClassType }) | null;
  ptBooking: (PTBooking & { coach: Coach }) | null;
};

export function deriveRoleLabel(review: ReviewRow): string {
  if (review.targetType === "PRODUCT" && review.product) return `Pembeli ${review.product.name}`;
  if (review.targetType === "CLASS_SESSION" && review.classSession) {
    return `Member Kelas ${review.classSession.classType.name}`;
  }
  if (review.targetType === "PT_BOOKING" && review.ptBooking) {
    return `Klien PT ${review.ptBooking.coach.name}`;
  }
  return "Member S-One Gym";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export function toTestimonial(review: ReviewRow, roleLabel: string): Testimonial {
  return {
    id: review.id,
    name: review.user.name ?? "Member",
    role: roleLabel,
    content: review.comment ?? "",
    rating: review.rating,
  };
}

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
    color: session.classType.color ?? "from-primary to-accent",
  };
}
