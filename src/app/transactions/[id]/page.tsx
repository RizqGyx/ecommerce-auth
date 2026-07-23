import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Package, CreditCard, CheckCircle } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { robots: { index: false, follow: false } };

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Menunggu Pembayaran",
  PAID: "Dibayar",
  SHIPPED: "Dikirim",
  COMPLETED: "Selesai",
  CANCELED: "Dibatalkan",
  REGISTERED: "Terdaftar",
  ATTENDED: "Sudah Hadir",
  NO_SHOW: "Tidak Hadir",
  ACTIVE: "Aktif",
};

export default async function TransactionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) notFound();
  const userId = session.user.id;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } }, payment: true },
  });
  if (order) {
    if (order.userId !== userId) notFound();
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Link href="/transactions" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft size={14} /> Kembali ke Transaksi
          </Link>

          <div className="glass rounded-2xl border border-border/20 p-6 mb-6">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Pesanan Produk</div>
            <h1 className="text-2xl font-black font-mono">{order.id}</h1>
            <div className="text-sm text-muted-foreground mt-1">
              {order.createdAt.toLocaleString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-green-400/20 bg-green-400/10 text-green-400 text-sm font-bold">
              <CheckCircle size={13} /> {STATUS_LABEL[order.status] ?? order.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-3 space-y-6">
              <div className="glass rounded-2xl border border-border/20 p-6">
                <h2 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                  <Package size={14} /> Produk Dipesan
                </h2>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-border/10 last:border-0 last:pb-0">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg shrink-0">📦</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{item.product.name}</div>
                        <div className="text-xs text-muted-foreground">×{item.quantity}</div>
                      </div>
                      <div className="font-bold text-sm text-primary shrink-0">
                        Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-5">
              <div className="glass rounded-2xl border border-border/20 p-5">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                  <CreditCard size={12} /> Pembayaran
                </h3>
                <div className="space-y-2 text-sm">
                  {order.payment && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Metode</span>
                      <span className="font-semibold">{order.payment.method}</span>
                    </div>
                  )}
                  <div className="border-t border-border/10 pt-2 flex justify-between font-black">
                    <span>Total</span>
                    <span className="gradient-text text-base">Rp {order.total.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>

              <Link href="/shop" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors">
                <Package size={14} /> Pesan Lagi
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const registration = await prisma.classRegistration.findUnique({
    where: { id },
    include: { session: { include: { classType: true, coach: true } } },
  });
  if (registration) {
    if (registration.userId !== userId) notFound();
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Link href="/transactions" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft size={14} /> Kembali ke Transaksi
          </Link>

          <div className="glass rounded-2xl border border-border/20 p-6 mb-6">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Booking Kelas</div>
            <h1 className="text-2xl font-black">{registration.session.classType.name}</h1>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-green-400/20 bg-green-400/10 text-green-400 text-sm font-bold">
              <CheckCircle size={13} /> {STATUS_LABEL[registration.status] ?? registration.status}
            </div>
          </div>

          <div className="glass rounded-2xl border border-border/20 p-6 mb-6">
            <h2 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
              <Calendar size={14} /> Detail Kelas
            </h2>
            <div className="space-y-3">
              {[
                { label: "Tanggal", value: registration.session.date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }), icon: <Calendar size={14} className="text-primary" /> },
                { label: "Waktu", value: `${registration.session.startTime} – ${registration.session.endTime}`, icon: <Clock size={14} className="text-primary" /> },
                { label: "Coach", value: registration.session.coach.name, icon: <User size={14} className="text-primary" /> },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3 text-sm">
                  <div className="w-7 flex justify-center shrink-0">{row.icon}</div>
                  <span className="text-muted-foreground w-20 shrink-0">{row.label}</span>
                  <span className="font-semibold">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl border border-border/20 p-5">
            <div className="flex justify-between font-black">
              <span>Total</span>
              <span className="gradient-text text-base">Rp {registration.session.price.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ptBooking = await prisma.pTBooking.findUnique({
    where: { id },
    include: { coach: true },
  });
  if (ptBooking) {
    if (ptBooking.userId !== userId) notFound();
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Link href="/transactions" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft size={14} /> Kembali ke Transaksi
          </Link>

          <div className="glass rounded-2xl border border-border/20 p-6 mb-6">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Personal Trainer</div>
            <h1 className="text-2xl font-black">Paket {ptBooking.packageName}</h1>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-green-400/20 bg-green-400/10 text-green-400 text-sm font-bold">
              <CheckCircle size={13} /> {STATUS_LABEL[ptBooking.status] ?? ptBooking.status}
            </div>
          </div>

          <div className="glass rounded-2xl border border-border/20 p-6 mb-6">
            <h2 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
              <User size={14} /> Detail Paket
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Trainer</span><span className="font-semibold">{ptBooking.coach.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sesi</span><span className="font-semibold">{ptBooking.sessionsUsed}/{ptBooking.sessionsTotal}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Berlaku Hingga</span><span className="font-semibold">{ptBooking.endDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span></div>
            </div>
          </div>

          <div className="glass rounded-2xl border border-border/20 p-5">
            <div className="flex justify-between font-black">
              <span>Total</span>
              <span className="gradient-text text-base">Rp {ptBooking.price.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  notFound();
}
