"use client";

import { useRouter } from "next/navigation";
import { CreditCard, RefreshCw } from "lucide-react";
import type { MockTransaction } from "@/lib/data";

interface Props {
  tx: MockTransaction;
  label?: string;
}

const RetryButton = ({ tx, label }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    const p = new URLSearchParams({
      category: tx.paymentCategory ?? "ewallet",
      method: tx.paymentMethodId ?? "gopay",
      methodName: tx.paymentMethod ?? "",
      total: String(tx.total),
      fee: "0",
      type: tx.type,
      orderId: tx.id,
      ...(tx.type === "booking"
        ? {
            ref: `${tx.id}${label ? "" : "-R"}`,
            class: tx.class ?? "",
            day: tx.day ?? "",
            time: tx.time ?? "",
            coach: tx.coach ?? "",
          }
        : {}),
    });
    router.push(`/payment?${p.toString()}`);
  };

  const isRetry = !label;

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-colors ${
        isRetry
          ? "border border-red-400/30 text-red-400 hover:bg-red-400/10"
          : "bg-primary text-primary-foreground hover:bg-primary/90"
      }`}
    >
      {isRetry ? <RefreshCw size={14} /> : <CreditCard size={14} />}
      {label ?? "Bayar Ulang"}
    </button>
  );
};

export default RetryButton;
