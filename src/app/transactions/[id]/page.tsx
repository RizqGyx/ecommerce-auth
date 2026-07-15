import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, MapPin, Truck, CreditCard, Package,
  Calendar, Clock, User, CheckCircle, RefreshCw,
} from "lucide-react";
import { MOCK_TRANSACTIONS } from "@/lib/data";
import { STATUS_CONFIG } from "@/components/molecules/TransactionCard";
import TrackingTimeline from "@/components/molecules/TrackingTimeline";
import RetryButton from "./RetryButton";

export const metadata = { robots: { index: false, follow: false } };

export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tx = MOCK_TRANSACTIONS.find((t) => t.id === id);
  if (!tx) notFound();

  const cfg = STATUS_CONFIG[tx.status];
  const Icon = cfg.icon;
  const isShop    = tx.type === "shop";
  const isBooking = tx.type === "booking";

  const createdDate = new Date(tx.createdAt).toLocaleString("id-ID", {
    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });

  const deadlineDate = tx.paymentDeadline
    ? new Date(tx.paymentDeadline).toLocaleString("id-ID", {
        day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
      })
    : null;

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Back */}
        <Link
          href="/transactions"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Kembali ke Transaksi
        </Link>

        {/* Header */}
        <div className="glass rounded-2xl border border-border/20 p-6 mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                {isShop ? "Pesanan Produk" : "Booking Kelas"}
              </div>
              <h1 className="text-2xl font-black font-mono">{tx.id}</h1>
              <div className="text-sm text-muted-foreground mt-1">{createdDate}</div>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-bold ${cfg.color}`}>
              <Icon size={13} />
              {cfg.label}
            </div>
          </div>

          {/* Payment deadline for pending */}
          {tx.status === "PENDING_PAYMENT" && deadlineDate && (
            <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl border border-yellow-400/20 bg-yellow-400/5 text-sm">
              <Clock size={14} className="text-yellow-400 shrink-0" />
              <span className="text-muted-foreground">Batas pembayaran:</span>
              <span className="font-bold text-yellow-400">{deadlineDate}</span>
            </div>
          )}

          {/* Expired: retry */}
          {tx.status === "PAYMENT_EXPIRED" && (
            <div className="mt-4 flex items-center justify-between px-4 py-3 rounded-xl border border-red-400/20 bg-red-400/5">
              <div className="text-sm text-red-400">Waktu pembayaran telah habis. Kamu bisa melakukan pembayaran ulang.</div>
              <RetryButton tx={tx} />
            </div>
          )}

          {/* Paid booking: confirmation */}
          {tx.status === "PAID" && isBooking && (
            <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 text-sm">
              <CheckCircle size={14} className="text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Booking dikonfirmasi</span>
              <span className="text-muted-foreground">— Datang 10 menit sebelum kelas dimulai</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Left column */}
          <div className="md:col-span-3 space-y-6">

            {/* Items — shop */}
            {isShop && tx.items && (
              <div className="glass rounded-2xl border border-border/20 p-6">
                <h2 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                  <Package size={14} /> Produk Dipesan
                </h2>
                <div className="space-y-3">
                  {tx.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 pb-3 border-b border-border/10 last:border-0 last:pb-0">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg shrink-0">
                        {item.emoji ?? "📦"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{item.name}</div>
                        {item.qty && (
                          <div className="text-xs text-muted-foreground">×{item.qty}</div>
                        )}
                      </div>
                      <div className="font-bold text-sm text-primary shrink-0">
                        Rp {((item.price) * (item.qty ?? 1)).toLocaleString("id-ID")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Class info — booking */}
            {isBooking && (
              <div className="glass rounded-2xl border border-border/20 p-6">
                <h2 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                  <Calendar size={14} /> Detail Kelas
                </h2>
                <div className="space-y-3">
                  {[
                    { label: "Kelas",    value: tx.class,    icon: <span className="text-base">🏋️</span> },
                    { label: "Hari",     value: tx.day,      icon: <Calendar size={14} className="text-primary" /> },
                    { label: "Tanggal",  value: tx.date,     icon: <Calendar size={14} className="text-primary" /> },
                    { label: "Waktu",    value: tx.time,     icon: <Clock size={14} className="text-primary" /> },
                    { label: "Coach",    value: tx.coach,    icon: <User size={14} className="text-primary" /> },
                    { label: "Lokasi",   value: tx.location, icon: <MapPin size={14} className="text-primary" /> },
                  ].filter((r) => r.value).map((row) => (
                    <div key={row.label} className="flex items-center gap-3 text-sm">
                      <div className="w-7 flex justify-center shrink-0">{row.icon}</div>
                      <span className="text-muted-foreground w-20 shrink-0">{row.label}</span>
                      <span className="font-semibold">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tracking timeline — shop with trackingSteps */}
            {isShop && tx.trackingSteps && (
              <div className="glass rounded-2xl border border-border/20 p-6">
                <h2 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                  <Truck size={14} /> Pelacakan Pengiriman
                </h2>
                <TrackingTimeline
                  steps={tx.trackingSteps.map((s) => ({
                    status: s.label,
                    desc: s.desc,
                    time: s.time ?? "",
                    done: s.done,
                  }))}
                />
              </div>
            )}

            {/* Pending shop: no tracking yet */}
            {isShop && !tx.trackingSteps && tx.status === "PENDING_PAYMENT" && (
              <div className="glass rounded-2xl border border-border/20 p-6 text-center py-10">
                <div className="text-3xl mb-2">📦</div>
                <div className="text-sm text-muted-foreground">
                  Pelacakan akan tersedia setelah pembayaran dikonfirmasi
                </div>
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="md:col-span-2 space-y-5">

            {/* Delivery address — shop */}
            {isShop && tx.address && (
              <div className="glass rounded-2xl border border-border/20 p-5">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                  <MapPin size={12} /> Alamat Pengiriman
                </h3>
                <div className="text-sm">{tx.address}</div>
                {tx.courier && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Truck size={11} /> {tx.courier}
                  </div>
                )}
              </div>
            )}

            {/* Payment info */}
            <div className="glass rounded-2xl border border-border/20 p-5">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                <CreditCard size={12} /> Pembayaran
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Metode</span>
                  <span className="font-semibold">{tx.paymentMethod ?? "—"}</span>
                </div>
                {isShop && tx.items && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal produk</span>
                    <span>
                      Rp {tx.items.reduce((s, i) => s + i.price * (i.qty ?? 1), 0).toLocaleString("id-ID")}
                    </span>
                  </div>
                )}
                <div className="border-t border-border/10 pt-2 flex justify-between font-black">
                  <span>Total</span>
                  <span className="gradient-text text-base">Rp {tx.total.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>

            {/* PENDING_PAYMENT: pay now button */}
            {tx.status === "PENDING_PAYMENT" && (
              <RetryButton tx={tx} label="Bayar Sekarang" />
            )}

            {/* COMPLETED: re-order / re-book */}
            {tx.status === "COMPLETED" && (
              <Link
                href={isShop ? "/shop" : "/schedule"}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                {isShop ? <><Package size={14} /> Pesan Lagi</> : <><Calendar size={14} /> Booking Lagi</>}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
