import Link from "next/link";
import { ArrowRight, ShoppingBag, Dumbbell, User, ReceiptText } from "lucide-react";
import type { TransactionSummary } from "@/lib/serializers";

const TYPE_ICON: Record<TransactionSummary["type"], typeof ShoppingBag> = {
  shop: ShoppingBag,
  booking: Dumbbell,
  pt: User,
};

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

function formatRelativeDate(date: Date) {
  const diffDays = Math.floor((startOfDay(new Date()) - startOfDay(date)) / 86400000);
  if (diffDays === 0) return "Hari ini";
  if (diffDays === 1) return "Kemarin";
  if (diffDays > 1) return `${diffDays} hari lalu`;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

interface Props {
  transactions: TransactionSummary[];
}

export default function RecentTransactionsWidget({ transactions }: Props) {
  const recent = transactions.slice(0, 3);

  return (
    <div className="glass rounded-2xl border border-border/20 overflow-hidden">
      <div className="flex items-center justify-between p-5 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <ReceiptText size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="font-bold leading-tight">Transaksi Terbaru</h3>
          </div>
        </div>
        <Link
          href="/transactions"
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-semibold transition-colors shrink-0"
        >
          Lihat Semua <ArrowRight size={13} />
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="px-5 pb-8 text-center text-sm text-muted-foreground">Belum ada transaksi.</div>
      ) : (
        <div className="px-3 pb-3 space-y-1.5">
          {recent.map((tx) => {
            const TypeIcon = TYPE_ICON[tx.type];

            return (
              <Link
                key={`${tx.type}-${tx.id}`}
                href={`/transactions/${tx.id}`}
                className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div
                  className={`w-1 h-10 rounded-full shrink-0 ${
                    tx.type === "shop" ? "bg-accent" : "bg-primary"
                  }`}
                />
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    tx.type === "shop" ? "bg-accent/10" : "bg-primary/10"
                  }`}
                >
                  <TypeIcon size={16} className={tx.type === "shop" ? "text-accent" : "text-primary"} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{tx.title}</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span>Rp {tx.total.toLocaleString("id-ID")}</span>
                    <span>·</span>
                    <span>{formatRelativeDate(tx.createdAt)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
