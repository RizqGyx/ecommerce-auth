import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Package, CreditCard, Receipt, Wallet, Truck, PartyPopper, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const PROGRESS_STEPS = [
  { key: "PENDING", label: "Pesanan Dibuat", icon: Receipt },
  { key: "PAID", label: "Dibayar", icon: Wallet },
  { key: "SHIPPED", label: "Dikirim", icon: Truck },
  { key: "COMPLETED", label: "Selesai", icon: PartyPopper },
] as const;

export const metadata = { robots: { index: false, follow: false } };

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Menunggu Pembayaran",
  PAID: "Dibayar",
  SHIPPED: "Dikirim",
  COMPLETED: "Selesai",
  CANCELED: "Dibatalkan",
};
const STATUS_COLOR: Record<string, string> = {
  PENDING: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  PAID: "text-green-400 bg-green-400/10 border-green-400/20",
  SHIPPED: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  COMPLETED: "text-green-400 bg-green-400/10 border-green-400/20",
  CANCELED: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default async function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const session = await auth();
  if (!session?.user) notFound();

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true } }, payment: true },
  });

  if (!order || order.userId !== session.user.id) notFound();

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Back */}
        <Link
          href="/orders"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Kembali ke Daftar Pesanan
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <h1 className="text-2xl font-black">Detail <span className="gradient-text">Pesanan</span></h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-muted-foreground text-sm">{order.id}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_COLOR[order.status]}`}>
                {STATUS_LABEL[order.status]}
              </span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Dipesan {order.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>

        {/* Order progress tracker */}
        {order.status === "CANCELED" ? (
          <div className="glass rounded-2xl border border-red-400/20 p-6 mb-6 flex items-center gap-3">
            <XCircle size={22} className="text-red-400 shrink-0" />
            <div>
              <p className="font-bold text-sm text-red-400">Pesanan Dibatalkan</p>
              <p className="text-xs text-muted-foreground mt-0.5">Pesanan ini tidak dilanjutkan. Hubungi kami jika ini tidak sesuai.</p>
            </div>
          </div>
        ) : (
          <div className="glass rounded-2xl border border-border/20 p-6 mb-6">
            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 right-0 top-5 h-0.5 bg-border/20" />
              <div
                className="absolute left-0 top-5 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{
                  width: `${(PROGRESS_STEPS.findIndex((s) => s.key === order.status) / (PROGRESS_STEPS.length - 1)) * 100}%`,
                }}
              />
              {PROGRESS_STEPS.map((step, i) => {
                const currentIdx = PROGRESS_STEPS.findIndex((s) => s.key === order.status);
                const isDone = i <= currentIdx;
                const isCurrent = i === currentIdx;
                const Icon = step.icon;
                return (
                  <div key={step.key} className="relative z-10 flex flex-col items-center gap-2 flex-1">
                    <div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isDone
                          ? "bg-gradient-to-br from-primary to-accent border-transparent shadow-lg shadow-primary/30"
                          : "bg-background border-border/30"
                      } ${isCurrent ? "scale-110" : ""}`}
                    >
                      <Icon size={16} className={isDone ? "text-white" : "text-muted-foreground"} />
                    </div>
                    <span className={`text-[10px] font-semibold text-center ${isDone ? "text-foreground" : "text-muted-foreground/60"}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* LEFT: Products */}
          <div className="lg:col-span-3 space-y-5">
            <div className="glass rounded-2xl border border-border/20 p-6">
              <h2 className="font-bold flex items-center gap-2 mb-4">
                <Package size={18} className="text-primary" /> Produk
              </h2>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg shrink-0">
                      📦
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{item.product.name}</div>
                      <div className="text-xs text-muted-foreground">×{item.quantity}</div>
                    </div>
                    <div className="text-sm font-bold text-primary shrink-0">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Payment summary */}
          <div className="lg:col-span-2 space-y-5">
            <div className="glass rounded-2xl border border-border/20 p-5">
              <h3 className="font-bold text-sm flex items-center gap-2 mb-3">
                <CreditCard size={15} className="text-primary" /> Detail Pembayaran
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between font-black text-base pt-2 border-t border-border/20">
                  <span>Total</span>
                  <span className="gradient-text">Rp {order.total.toLocaleString("id-ID")}</span>
                </div>
              </div>
              {order.payment && (
                <div className="mt-3 pt-3 border-t border-border/20 text-xs text-muted-foreground flex justify-between">
                  <span>Metode</span>
                  <span className="font-medium text-foreground">{order.payment.method}</span>
                </div>
              )}
            </div>

            <Button variant="neon" className="w-full" asChild>
              <Link href="/shop">Belanja Lagi</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
