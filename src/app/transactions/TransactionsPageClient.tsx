"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag, Dumbbell, User, ReceiptText, ChevronRight,
  Clock, CheckCircle, Truck, XCircle, Ban,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TransactionSummary } from "@/lib/serializers";

type TypeFilter = "all" | "shop" | "booking" | "pt";

const TYPE_META: Record<TransactionSummary["type"], { label: string; icon: typeof ShoppingBag }> = {
  shop: { label: "Produk", icon: ShoppingBag },
  booking: { label: "Booking Kelas", icon: Dumbbell },
  pt: { label: "Personal Trainer", icon: User },
};

const STATUS_META: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  PENDING: { label: "Menunggu Pembayaran", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", icon: Clock },
  PAID: { label: "Dibayar", color: "text-green-400 bg-green-400/10 border-green-400/20", icon: CheckCircle },
  SHIPPED: { label: "Dikirim", color: "text-blue-400 bg-blue-400/10 border-blue-400/20", icon: Truck },
  COMPLETED: { label: "Selesai", color: "text-green-400 bg-green-400/10 border-green-400/20", icon: CheckCircle },
  CANCELED: { label: "Dibatalkan", color: "text-red-400 bg-red-400/10 border-red-400/20", icon: XCircle },
  REGISTERED: { label: "Terdaftar", color: "text-green-400 bg-green-400/10 border-green-400/20", icon: CheckCircle },
  ATTENDED: { label: "Sudah Hadir", color: "text-primary bg-primary/10 border-primary/20", icon: CheckCircle },
  NO_SHOW: { label: "Tidak Hadir", color: "text-muted-foreground bg-muted/20 border-border/20", icon: Ban },
  ACTIVE: { label: "Aktif", color: "text-green-400 bg-green-400/10 border-green-400/20", icon: CheckCircle },
};

interface Props {
  transactions: TransactionSummary[];
}

function groupByMonth(transactions: TransactionSummary[]): Record<string, TransactionSummary[]> {
  const groups: Record<string, TransactionSummary[]> = {};
  for (const tx of transactions) {
    const label = tx.createdAt.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
    (groups[label] ??= []).push(tx);
  }
  return groups;
}

export default function TransactionsPageClient({ transactions }: Props) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const filtered = transactions.filter((tx) => typeFilter === "all" || tx.type === typeFilter);

  const counts = {
    all: transactions.length,
    shop: transactions.filter((t) => t.type === "shop").length,
    booking: transactions.filter((t) => t.type === "booking").length,
    pt: transactions.filter((t) => t.type === "pt").length,
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
              <ReceiptText size={20} className="text-primary" />
            </div>
            <h1 className="text-3xl font-black">
              Transaksi <span className="gradient-text">Saya</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Semua riwayat pembelian produk, booking kelas, dan personal trainer
          </p>
        </div>

        {/* Type filter */}
        <div className="flex gap-1 mb-6 glass rounded-2xl p-1.5 border border-border/20 overflow-x-auto">
          {(["all", "shop", "booking", "pt"] as TypeFilter[]).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0",
                typeFilter === t
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              {t === "all" ? "Semua" : TYPE_META[t].label}
              <span className={cn(
                "w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center",
                typeFilter === t ? "bg-white/20 text-white" : "bg-border/30 text-muted-foreground"
              )}>
                {counts[t]}
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🧾</div>
            <h3 className="font-bold mb-1">Belum ada transaksi</h3>
            <p className="text-sm text-muted-foreground">Riwayat pembelian dan bookingmu akan muncul di sini.</p>
          </div>
        ) : (
          /* Chronological timeline — spans 3 different transaction types, so a
             connected timeline reads better than a flat list of identical rows. */
          <div className="relative">
            <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-border/30 to-transparent" />
            <div className="space-y-10">
              {Object.entries(groupByMonth(filtered)).map(([month, txs]) => (
                <div key={month}>
                  <div className="relative flex items-center gap-4 mb-4">
                    <div className="relative z-10 w-9 h-9 rounded-full bg-background border-2 border-primary/40 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{month}</span>
                  </div>

                  <div className="space-y-3 pl-[46px]">
                    {txs.map((tx) => {
                      const typeMeta = TYPE_META[tx.type];
                      const TypeIcon = typeMeta.icon;
                      const statusMeta = STATUS_META[tx.status] ?? STATUS_META.PENDING;
                      const StatusIcon = statusMeta.icon;

                      return (
                        <Link
                          key={`${tx.type}-${tx.id}`}
                          href={`/transactions/${tx.id}`}
                          className="group glass rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 p-5 flex items-center gap-4"
                        >
                          <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                            <TypeIcon size={20} className="text-primary" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                {typeMeta.label}
                              </span>
                              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1", statusMeta.color)}>
                                <StatusIcon size={9} /> {statusMeta.label}
                              </span>
                            </div>
                            <div className="text-sm font-semibold truncate">{tx.title}</div>
                            <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                              <span>{tx.subtitle}</span>
                              <span>·</span>
                              <span>{tx.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="font-bold text-sm text-primary">Rp {tx.total.toLocaleString("id-ID")}</div>
                          </div>

                          <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
