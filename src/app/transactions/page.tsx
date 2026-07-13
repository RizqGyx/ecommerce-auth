"use client";

import { useState } from "react";
import { ShoppingBag, Dumbbell, ReceiptText } from "lucide-react";
import { MOCK_TRANSACTIONS, type TransactionStatus } from "@/lib/data";
import TransactionCard from "@/components/molecules/TransactionCard";
import { cn } from "@/lib/utils";

type Tab = "all" | "pending" | "progress" | "completed" | "expired";

const TABS: { id: Tab; label: string; statuses: TransactionStatus[] }[] = [
  { id: "all",       label: "Semua",            statuses: ["PENDING_PAYMENT","PAYMENT_EXPIRED","PAID","IN_PROGRESS","COMPLETED","CANCELLED"] },
  { id: "pending",   label: "Menunggu Bayar",   statuses: ["PENDING_PAYMENT"] },
  { id: "progress",  label: "Diproses",         statuses: ["PAID","IN_PROGRESS"] },
  { id: "completed", label: "Selesai",          statuses: ["COMPLETED"] },
  { id: "expired",   label: "Kedaluwarsa",      statuses: ["PAYMENT_EXPIRED","CANCELLED"] },
];

type TypeFilter = "all" | "shop" | "booking";

export default function TransactionsPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const activeTab = TABS.find((t) => t.id === tab)!;

  const filtered = MOCK_TRANSACTIONS
    .filter((tx) => activeTab.statuses.includes(tx.status))
    .filter((tx) => typeFilter === "all" || tx.type === typeFilter)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const counts = {
    all:       MOCK_TRANSACTIONS.length,
    pending:   MOCK_TRANSACTIONS.filter((t) => t.status === "PENDING_PAYMENT").length,
    progress:  MOCK_TRANSACTIONS.filter((t) => t.status === "PAID" || t.status === "IN_PROGRESS").length,
    completed: MOCK_TRANSACTIONS.filter((t) => t.status === "COMPLETED").length,
    expired:   MOCK_TRANSACTIONS.filter((t) => t.status === "PAYMENT_EXPIRED" || t.status === "CANCELLED").length,
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-10">
        {/* Page header */}
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
            Semua riwayat pembelian produk dan booking kelas
          </p>
        </div>

        {/* Type filter pills */}
        <div className="flex gap-2 mb-5">
          {(["all", "shop", "booking"] as TypeFilter[]).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all",
                typeFilter === t
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border/30 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              {t === "all" && "Semua Tipe"}
              {t === "shop" && <><ShoppingBag size={11} /> Produk</>}
              {t === "booking" && <><Dumbbell size={11} /> Booking Kelas</>}
            </button>
          ))}
        </div>

        {/* Status tabs */}
        <div className="flex gap-1 mb-6 glass rounded-2xl p-1.5 border border-border/20 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0",
                tab === t.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              {t.label}
              {counts[t.id] > 0 && (
                <span className={cn(
                  "w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center",
                  tab === t.id
                    ? "bg-white/20 text-white"
                    : "bg-border/30 text-muted-foreground"
                )}>
                  {counts[t.id]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Transaction list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🧾</div>
            <h3 className="font-bold mb-1">Tidak ada transaksi</h3>
            <p className="text-sm text-muted-foreground">
              {tab === "pending" ? "Tidak ada transaksi yang menunggu pembayaran."
                : tab === "expired" ? "Tidak ada transaksi yang kedaluwarsa."
                : "Belum ada transaksi di kategori ini."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((tx) => (
              <TransactionCard key={tx.id} tx={tx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
