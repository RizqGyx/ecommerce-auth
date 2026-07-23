import Link from "next/link";
import { notFound } from "next/navigation";
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { robots: { index: false, follow: false } };

const STATUS_CONFIG = {
  PENDING: { label: "Menunggu Pembayaran", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", icon: Clock },
  PAID: { label: "Dibayar", color: "text-green-400 bg-green-400/10 border-green-400/20", icon: CheckCircle },
  SHIPPED: { label: "Dikirim", color: "text-blue-400 bg-blue-400/10 border-blue-400/20", icon: Truck },
  COMPLETED: { label: "Selesai", color: "text-green-400 bg-green-400/10 border-green-400/20", icon: CheckCircle },
  CANCELED: { label: "Dibatalkan", color: "text-red-400 bg-red-400/10 border-red-400/20", icon: XCircle },
};

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user) notFound();

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black">Pesanan <span className="gradient-text">Saya</span></h1>
          <p className="text-muted-foreground mt-1">{orders.length} pesanan ditemukan</p>
        </div>

        {orders.length === 0 ? (
          <div className="glass rounded-2xl border border-border/20 p-10 text-center">
            <Package size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground mb-4">Kamu belum punya pesanan.</p>
            <Link href="/shop" className="text-sm text-primary hover:text-primary/80 transition-colors">
              Mulai belanja →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const cfg = STATUS_CONFIG[order.status];
              const Icon = cfg.icon;
              const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);

              return (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="group glass rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 p-5 flex items-center gap-4"
                >
                  <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                    <Package size={22} className="text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono font-bold text-sm">{order.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.color} flex items-center gap-1`}>
                        <Icon size={9} /> {cfg.label}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {order.items.map((i) => i.product.name).join(", ")}
                    </div>
                    <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground">
                      <span>{itemCount} produk</span>
                      <span>·</span>
                      <span>{order.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                      <span>·</span>
                      <span className="text-primary font-semibold">Rp {order.total.toLocaleString("id-ID")}</span>
                    </div>
                  </div>

                  <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/shop" className="text-sm text-primary hover:text-primary/80 transition-colors">
            Belanja lebih banyak →
          </Link>
        </div>
      </div>
    </div>
  );
}
