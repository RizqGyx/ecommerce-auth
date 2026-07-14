import Link from "next/link";
import { ShoppingBag, Dumbbell, Users, CreditCard, Newspaper } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminOverviewPage() {
  const [products, classTypes, coaches, plans, posts] = await Promise.all([
    prisma.product.count(),
    prisma.classType.count(),
    prisma.coach.count(),
    prisma.membershipPlan.count(),
    prisma.blogPost.count(),
  ]);

  const cards = [
    { label: "Products", value: products, href: "/admin/products", icon: ShoppingBag },
    { label: "Classes", value: classTypes, href: "/admin/classes", icon: Dumbbell },
    { label: "Coaches", value: coaches, href: "/admin/coaches", icon: Users },
    { label: "Membership Plans", value: plans, href: "/admin/membership-plans", icon: CreditCard },
    { label: "Blog Posts", value: posts, href: "/admin/blog-posts", icon: Newspaper },
  ];

  return (
    <div>
      <h1 className="text-2xl font-black mb-1">Overview</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Kelola konten yang tampil di halaman publik S-One Gym.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="glass rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-200 p-5 flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <card.icon size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-black">{card.value}</div>
              <div className="text-xs text-muted-foreground">{card.label}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
