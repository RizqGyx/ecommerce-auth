import { Star, Quote } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { toTestimonial, deriveRoleLabel } from "@/lib/serializers";

const TestimonialsSection = async () => {
  const reviews = await prisma.review.findMany({
    where: { rating: { gte: 4 }, comment: { not: null } },
    include: {
      user: true,
      product: true,
      classSession: { include: { classType: true } },
      ptBooking: { include: { coach: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  const testimonials = reviews
    .filter((r) => r.comment && r.comment.trim().length > 0)
    .map((r) => toTestimonial(r, deriveRoleLabel(r)));

  if (testimonials.length < 3) return null;

  const allRatings = await prisma.review.aggregate({ _avg: { rating: true }, _count: { rating: true } });
  const avgRating = allRatings._avg.rating ?? 0;
  const totalCount = allRatings._count.rating;

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-background" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">
              Member Stories
            </span>
            <h2 className="text-4xl lg:text-5xl font-black">
              Real People, <span className="gradient-text">Real Results</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full border border-border/20">
            <div className="flex">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-semibold">{avgRating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">dari {totalCount} ulasan</span>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-5 animate-marquee" style={{ width: "max-content" }}>
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              className="w-80 shrink-0 glass rounded-2xl p-6 border border-border/20 hover:border-primary/30 transition-all duration-300 relative group"
            >
              <Quote
                size={32}
                className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/15 transition-colors"
                fill="currentColor"
              />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 relative z-10 line-clamp-4">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/20">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-xs font-bold shrink-0">
                  {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
