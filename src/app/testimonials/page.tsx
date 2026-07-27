import { prisma } from "@/lib/prisma";
import { toTestimonial, deriveRoleLabel } from "@/lib/serializers";
import { buildMetadata } from "@/lib/seo";
import TestimonialsPageClient, { type TestimonialItem } from "./TestimonialsPageClient";

export const metadata = buildMetadata({
  title: "Testimoni Member",
  description: "Cerita nyata dari member S-One Gym Bukittinggi — kelas, personal training, dan produk.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const [reviews, ratingAgg] = await Promise.all([
    prisma.review.findMany({
      where: { rating: { gte: 4 }, comment: { not: null } },
      include: {
        user: true,
        product: true,
        classSession: { include: { classType: true } },
        ptBooking: { include: { coach: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.review.aggregate({ _avg: { rating: true }, _count: { rating: true } }),
  ]);

  const items: TestimonialItem[] = reviews
    .filter((r) => r.comment && r.comment.trim().length > 0)
    .map((r) => ({
      ...toTestimonial(r, deriveRoleLabel(r)),
      category: r.targetType,
    }));

  return (
    <TestimonialsPageClient
      items={items}
      avgRating={ratingAgg._avg.rating ?? 0}
      totalCount={ratingAgg._count.rating}
    />
  );
}
