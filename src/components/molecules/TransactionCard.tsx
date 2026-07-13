"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag, Dumbbell, Clock, CheckCircle, Truck,
  XCircle, ChevronRight, AlertCircle, RefreshCw, CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { MockTransaction, TransactionStatus } from "@/lib/data";

// ─── Status config ─────────────────────────────────────────────────────────────

export const STATUS_CONFIG: Record<TransactionStatus, {
  label: string;
  color: string;
  icon: typeof Clock;
}> = {
  PENDING_PAYMENT: { label: "Menunggu Bayar", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", icon: Clock },
  PAYMENT_EXPIRED: { label: "Kedaluwarsa",    color: "text-red-400 bg-red-400/10 border-red-400/20",         icon: XCircle },
  PAID:            { label: "Dibayar",         color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", icon: CreditCard },
  IN_PROGRESS:     { label: "Dalam Proses",    color: "text-blue-400 bg-blue-400/10 border-blue-400/20",       icon: Truck },
  COMPLETED:       { label: "Selesai",         color: "text-primary bg-primary/10 border-primary/20",          icon: CheckCircle },
  CANCELLED:       { label: "Dibatalkan",      color: "text-muted-foreground bg-muted/20 border-border/20",    icon: XCircle },
};

// ─── Countdown hook ────────────────────────────────────────────────────────────

function useCountdown(deadline?: string) {
  const getLeft = () =>
    deadline ? Math.max(0, Math.floor((new Date(deadline).getTime() - Date.now()) / 1000)) : 0;

  const [left, setLeft] = useState(getLeft);

  useEffect(() => {
    if (!deadline) return;
    const t = setInterval(() => setLeft(getLeft()), 1000);
    return () => clearInterval(t);
  });

  if (!deadline) return null;
  const h = Math.floor(left / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = left % 60;
  return { expired: left === 0, h, m, s, label: h > 0 ? `${h}j ${m}m ${s}d` : `${m}m ${s}d` };
}

// ─── TransactionCard ──────────────────────────────────────────────────────────

interface Props {
  tx: MockTransaction;
}

const TransactionCard = ({ tx }: Props) => {
  const router = useRouter();
  const countdown = useCountdown(tx.paymentDeadline);
  const cfg = STATUS_CONFIG[tx.status];
  const Icon = cfg.icon;

  const isShop    = tx.type === "shop";
  const isBooking = tx.type === "booking";

  const createdDate = new Date(tx.createdAt).toLocaleDateString("id-ID", {
    day: "numeric", month: "short", year: "numeric",
  });

  // Items preview
  const itemPreview = isShop && tx.items
    ? tx.items.slice(0, 2).map((i) => `${i.emoji ?? "•"} ${i.name}`).join("  ·  ") +
      (tx.items.length > 2 ? `  +${tx.items.length - 2} lainnya` : "")
    : isBooking
    ? `${tx.class} — ${tx.day}, ${tx.date}`
    : "";

  const handleRetry = () => {
    const p = new URLSearchParams({
      category: tx.paymentCategory ?? "ewallet",
      method: tx.paymentMethodId ?? "gopay",
      methodName: tx.paymentMethod ?? "",
      total: String(tx.total),
      fee: "0",
      type: isShop ? "shop" : "booking",
      orderId: tx.id,
      ...(isBooking ? {
        ref: `${tx.id}-R`,
        class: tx.class ?? "",
        day: tx.day ?? "",
        time: tx.time ?? "",
        coach: tx.coach ?? "",
      } : {}),
    });
    router.push(`/payment?${p.toString()}`);
  };

  const handlePay = () => {
    const p = new URLSearchParams({
      category: tx.paymentCategory ?? "ewallet",
      method: tx.paymentMethodId ?? "gopay",
      methodName: tx.paymentMethod ?? "",
      total: String(tx.total),
      fee: "0",
      type: isShop ? "shop" : "booking",
      orderId: tx.id,
      ...(isBooking ? {
        ref: `${tx.id}`,
        class: tx.class ?? "",
        day: tx.day ?? "",
        time: tx.time ?? "",
        coach: tx.coach ?? "",
      } : {}),
    });
    router.push(`/payment?${p.toString()}`);
  };

  return (
    <div className="glass rounded-2xl border border-border/20 hover:border-primary/20 transition-all duration-300 overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/10 bg-white/2">
        <div className="flex items-center gap-2">
          <div className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
            isShop
              ? "bg-primary/10 text-primary border border-primary/20"
              : "bg-accent/10 text-accent border border-accent/20"
          )}>
            {isShop ? <ShoppingBag size={9} /> : <Dumbbell size={9} />}
            {isShop ? "Produk" : "Booking"}
          </div>
          <span className="text-xs text-muted-foreground font-mono">{tx.id}</span>
          <span className="text-muted-foreground/30 text-xs">·</span>
          <span className="text-xs text-muted-foreground">{createdDate}</span>
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border",
          cfg.color
        )}>
          <Icon size={9} />
          {cfg.label}
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        {/* Content preview */}
        <div className="flex items-start gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0",
            isShop ? "bg-primary/10" : "bg-accent/10"
          )}>
            {isShop
              ? (tx.items?.[0]?.emoji ?? "🛍️")
              : (tx.class === "Zumba" ? "💃" : tx.class === "Yoga Flow" ? "🧘" : tx.class === "HIIT" ? "⚡" : tx.class === "Pilates" ? "🌸" : "🏋️")
            }
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate mb-0.5">
              {isShop
                ? (tx.items?.[0]?.name ?? "Produk")
                : tx.class
              }
            </div>
            <div className="text-xs text-muted-foreground truncate">{itemPreview}</div>

            {/* Booking extra info */}
            {isBooking && (
              <div className="flex flex-wrap gap-3 mt-1.5 text-[10px] text-muted-foreground">
                {tx.time && <span className="flex items-center gap-1"><Clock size={9} /> {tx.time}</span>}
                {tx.coach && <span>Coach: {tx.coach}</span>}
              </div>
            )}

            {/* Shop courier */}
            {isShop && tx.courier && (
              <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                <Truck size={9} /> {tx.courier}
              </div>
            )}
          </div>

          {/* Total */}
          <div className="text-right shrink-0">
            <div className="text-xs text-muted-foreground">Total</div>
            <div className="font-bold text-sm text-primary">
              Rp {tx.total.toLocaleString("id-ID")}
            </div>
          </div>
        </div>

        {/* PENDING_PAYMENT: countdown + pay button */}
        {tx.status === "PENDING_PAYMENT" && countdown && (
          <div className={cn(
            "mt-4 flex items-center justify-between px-4 py-2.5 rounded-xl border",
            countdown.expired
              ? "border-red-400/20 bg-red-400/5"
              : "border-yellow-400/20 bg-yellow-400/5"
          )}>
            <div className="flex items-center gap-2">
              <AlertCircle size={13} className={countdown.expired ? "text-red-400" : "text-yellow-400"} />
              <span className="text-xs text-muted-foreground">
                {countdown.expired ? "Batas waktu habis" : "Bayar sebelum"}
              </span>
              {!countdown.expired && (
                <span className="font-mono text-sm font-black text-yellow-400">
                  {countdown.label}
                </span>
              )}
            </div>
            <button
              onClick={handlePay}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors"
            >
              <CreditCard size={11} /> Bayar Sekarang
            </button>
          </div>
        )}

        {/* PAYMENT_EXPIRED: retry */}
        {tx.status === "PAYMENT_EXPIRED" && (
          <div className="mt-4 flex items-center justify-between px-4 py-2.5 rounded-xl border border-red-400/20 bg-red-400/5">
            <div className="flex items-center gap-2 text-xs text-red-400">
              <XCircle size={13} />
              <span>Pembayaran kedaluwarsa · bisa diulang</span>
            </div>
            <button
              onClick={handleRetry}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-400/30 text-red-400 text-xs font-bold hover:bg-red-400/10 transition-colors"
            >
              <RefreshCw size={11} /> Bayar Ulang
            </button>
          </div>
        )}

        {/* IN_PROGRESS shop: mini tracking */}
        {tx.status === "IN_PROGRESS" && isShop && tx.trackingSteps && (
          <div className="mt-4 px-4 py-2.5 rounded-xl border border-blue-400/20 bg-blue-400/5">
            <div className="flex items-center gap-2 text-xs text-blue-400">
              <Truck size={12} />
              <span className="font-semibold">
                {tx.trackingSteps.find((s) => s.active)?.label ?? "Sedang dikirim"}
              </span>
              <span className="text-muted-foreground">—</span>
              <span className="text-muted-foreground">
                {tx.trackingSteps.find((s) => s.active)?.time ?? ""}
              </span>
            </div>
          </div>
        )}

        {/* PAID booking: confirmation */}
        {tx.status === "PAID" && isBooking && (
          <div className="mt-4 px-4 py-2.5 rounded-xl border border-emerald-400/20 bg-emerald-400/5">
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle size={12} />
              <span className="font-semibold">Booking dikonfirmasi</span>
              <span className="text-muted-foreground">— datang 10 menit sebelum kelas dimulai</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 pb-4">
        <Link
          href={`/transactions/${tx.id}`}
          className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl border border-border/20 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/3 transition-all"
        >
          Lihat Detail <ChevronRight size={13} />
        </Link>
      </div>
    </div>
  );
};

export default TransactionCard;
