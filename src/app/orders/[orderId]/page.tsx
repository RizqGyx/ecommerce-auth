import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Package, MapPin, CreditCard, Copy, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import TrackingTimeline from "@/components/molecules/TrackingTimeline";
import { MOCK_ORDERS } from "@/lib/data";

export const metadata = { robots: { index: false, follow: false } };

const STATUS_LABEL: Record<string, string> = {
  PROCESSING: "Sedang Diproses",
  SHIPPING: "Dalam Pengiriman",
  DELIVERED: "Sudah Terkirim",
  CANCELLED: "Dibatalkan",
};
const STATUS_COLOR: Record<string, string> = {
  PROCESSING: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  SHIPPING: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  DELIVERED: "text-green-400 bg-green-400/10 border-green-400/20",
  CANCELLED: "text-red-400 bg-red-400/10 border-red-400/20",
};

const CATEGORY_ICONS: Record<string, string> = {
  Supplements: "💊", Food: "🥗", Merchandise: "👕", Equipment: "🏋️",
};

export default async function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const order = MOCK_ORDERS.find((o) => o.id === orderId);
  if (!order) notFound();

  const itemTotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);

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
            Dipesan {new Date(order.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* LEFT: Tracking + Products */}
          <div className="lg:col-span-3 space-y-5">
            {/* Tracking */}
            <div className="glass rounded-2xl border border-border/20 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold flex items-center gap-2">
                  <Truck size={18} className="text-primary" /> Lacak Pengiriman
                </h2>
                {order.courier.tracking !== "-" && (
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs text-muted-foreground">{order.courier.tracking}</span>
                    <button className="p-1 rounded hover:bg-white/5 transition-colors">
                      <Copy size={11} className="text-muted-foreground hover:text-primary" />
                    </button>
                  </div>
                )}
              </div>
              <TrackingTimeline steps={order.tracking} />
            </div>

            {/* Products */}
            <div className="glass rounded-2xl border border-border/20 p-6">
              <h2 className="font-bold flex items-center gap-2 mb-4">
                <Package size={18} className="text-primary" /> Produk
              </h2>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg shrink-0">
                      {CATEGORY_ICONS[item.category] ?? "📦"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.category} · ×{item.qty}</div>
                    </div>
                    <div className="text-sm font-bold text-primary shrink-0">
                      Rp {(item.price * item.qty).toLocaleString("id-ID")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Summary */}
          <div className="lg:col-span-2 space-y-5">
            {/* Delivery Address */}
            <div className="glass rounded-2xl border border-border/20 p-5">
              <h3 className="font-bold text-sm flex items-center gap-2 mb-3">
                <MapPin size={15} className="text-primary" /> Alamat Pengiriman
              </h3>
              <div className="text-sm">
                <div className="font-semibold">{order.address.recipient}</div>
                <div className="text-muted-foreground">{order.address.phone}</div>
                <div className="text-muted-foreground mt-1">
                  {order.address.street}, {order.address.city}, {order.address.province} {order.address.postal}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border/20 text-xs text-muted-foreground flex justify-between">
                <span>Kurir: <strong className="text-foreground">{order.courier.name}</strong></span>
              </div>
            </div>

            {/* Payment */}
            <div className="glass rounded-2xl border border-border/20 p-5">
              <h3 className="font-bold text-sm flex items-center gap-2 mb-3">
                <CreditCard size={15} className="text-primary" /> Detail Pembayaran
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal produk</span>
                  <span>Rp {itemTotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Ongkos kirim</span>
                  <span>Rp {order.courier.cost.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between font-black text-base pt-2 border-t border-border/20">
                  <span>Total</span>
                  <span className="gradient-text">Rp {order.payment.total.toLocaleString("id-ID")}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border/20 text-xs text-muted-foreground flex justify-between">
                <span>Metode</span>
                <span className="font-medium text-foreground">{order.payment.method}</span>
              </div>
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
