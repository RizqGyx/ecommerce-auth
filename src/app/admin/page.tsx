import Link from "next/link";
import {
  ShoppingBag, Dumbbell, Users, CreditCard, Newspaper,
  Wallet, UserCheck, Package, Timer, ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

const STATUS_COLOR: Record<string, string> = {
  PENDING: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  PAID: "text-green-400 bg-green-400/10 border-green-400/20",
  SHIPPED: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  COMPLETED: "text-green-400 bg-green-400/10 border-green-400/20",
  CANCELED: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default async function AdminOverviewPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    products, classTypes, coaches, plans, posts,
    activeMembers, ordersThisMonth, revenueAgg, ptActive,
    recentOrders,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.classType.count(),
    prisma.coach.count(),
    prisma.membershipPlan.count(),
    prisma.blogPost.count(),
    prisma.gymMembership.count({ where: { status: "ACTIVE" } }),
    prisma.order.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { createdAt: { gte: startOfMonth }, status: { in: ["PAID", "SHIPPED", "COMPLETED"] } },
    }),
    prisma.pTBooking.count({ where: { status: "ACTIVE" } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    }),
  ]);

  const revenue = revenueAgg._sum.total ?? 0;

  const statCards = [
    { label: "Member Aktif", value: activeMembers, icon: UserCheck, color: "text-primary bg-primary/10 border-primary/20" },
    { label: "Pendapatan Bulan Ini", value: `Rp ${revenue.toLocaleString("id-ID")}`, icon: Wallet, color: "text-green-400 bg-green-400/10 border-green-400/20" },
    { label: "Pesanan Bulan Ini", value: ordersThisMonth, icon: Package, color: "text-accent bg-accent/10 border-accent/20" },
    { label: "PT Aktif", value: ptActive, icon: Timer, color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", href: "/admin/pt-bookings" },
  ];

  const contentCards = [
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
        Ringkasan bisnis dan pengelolaan konten S-One Gym.
      </p>

      {/* Business at a glance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((card) => {
          const content = (
            <div className="glass rounded-2xl border border-border/20 p-5 flex items-center gap-4 h-full">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${card.color}`}>
                <card.icon size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-xl font-black tabular-nums truncate">{card.value}</div>
                <div className="text-xs text-muted-foreground">{card.label}</div>
              </div>
            </div>
          );
          return card.href ? (
            <Link key={card.label} href={card.href} className="hover:-translate-y-0.5 transition-transform duration-200">
              {content}
            </Link>
          ) : (
            <div key={card.label}>{content}</div>
          );
        })}
      </div>

      {/* Recent orders */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Pesanan Terbaru</h2>
          <Link href="/admin/products" className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors">
            Kelola Produk <ArrowRight size={12} />
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="glass rounded-2xl border border-border/20 p-8 text-center text-sm text-muted-foreground">
            Belum ada pesanan.
          </div>
        ) : (
          <div className="glass rounded-2xl border border-border/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/20 bg-white/[0.02]">
                    <th className="text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground px-5 py-3">Order</th>
                    <th className="text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground px-5 py-3">Member</th>
                    <th className="text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground px-5 py-3">Status</th>
                    <th className="text-right font-semibold text-xs uppercase tracking-wide text-muted-foreground px-5 py-3">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-xs">{order.id.slice(-10)}</td>
                      <td className="px-5 py-3.5">{order.user.name ?? order.user.email}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_COLOR[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right font-semibold tabular-nums">
                        Rp {order.total.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Content management */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Kelola Konten</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contentCards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="glass rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-200 p-5 flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <card.icon size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-2xl font-black tabular-nums">{card.value}</div>
                <div className="text-xs text-muted-foreground">{card.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
