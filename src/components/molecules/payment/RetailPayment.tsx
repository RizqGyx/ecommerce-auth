"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Copy, Check, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PaymentTimer from "./PaymentTimer";

interface RetailPaymentProps {
  methodId: string;
  methodName: string;
  total: number;
  fee: number;
  orderId: string;
  successUrl: string;
  onClearCart?: () => void;
  onConfirm?: () => Promise<string | void>;
}

const STORE_META: Record<string, { emoji: string; color: string; bg: string; steps: string[] }> = {
  indomaret: {
    emoji: "🏪",
    color: "text-red-400",
    bg: "border-red-400/20 bg-red-400/5",
    steps: [
      "Kunjungi Indomaret terdekat",
      "Tunjukkan kode pembayaran kepada kasir",
      "Kasir akan memindai atau memasukkan kode",
      "Bayar sesuai nominal yang tertera",
      "Simpan struk sebagai bukti pembayaran",
    ],
  },
  alfamart: {
    emoji: "🏬",
    color: "text-blue-400",
    bg: "border-blue-400/20 bg-blue-400/5",
    steps: [
      "Kunjungi Alfamart terdekat",
      "Beri tahu kasir ingin bayar via virtual payment",
      "Berikan kode pembayaran kepada kasir",
      "Bayar sesuai nominal yang tertera",
      "Simpan struk sebagai bukti pembayaran",
    ],
  },
};

const RetailPayment = ({ methodId, methodName, total, fee, orderId, successUrl, onClearCart, onConfirm }: RetailPaymentProps) => {
  const router = useRouter();
  const meta = STORE_META[methodId] ?? STORE_META.indomaret;

  const seed = orderId.replace(/\D/g, "").slice(-9).padStart(9, "0");
  const paymentCode = `88077${seed}`;
  const codeFormatted = paymentCode.match(/.{1,5}/g)?.join(" – ") ?? paymentCode;

  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = () => {
    navigator.clipboard.writeText(paymentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = async () => {
    setChecking(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 2000));
      const redirectUrl = await onConfirm?.();
      onClearCart?.();
      router.push(redirectUrl || successUrl);
    } catch (err) {
      setChecking(false);
      setError(err instanceof Error ? err.message : "Gagal memproses pembayaran.");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="text-center">
        <div className="text-5xl mb-2">{meta.emoji}</div>
        <h2 className="font-black text-xl">Bayar di {methodName}</h2>
        <p className="text-sm text-muted-foreground">Tunjukkan kode di bawah kepada kasir</p>
      </div>

      {/* Payment code */}
      <div className={cn("glass rounded-2xl border p-6 text-center", meta.bg)}>
        <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Kode Pembayaran</div>
        <div className={cn("font-mono text-3xl font-black tracking-widest mb-3", meta.color)}>
          {codeFormatted}
        </div>
        <button
          onClick={copy}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all",
            copied
              ? "border-green-400/30 bg-green-400/10 text-green-400"
              : cn("border-current/20 hover:bg-white/5", meta.color)
          )}
        >
          {copied ? <><Check size={12} /> Kode Disalin</> : <><Copy size={12} /> Salin Kode</>}
        </button>
      </div>

      {/* Amount + timer */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-2xl border border-border/20 p-4">
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Total Bayar</div>
          <div className={cn("text-xl font-black", meta.color)}>
            Rp {(total + fee).toLocaleString("id-ID")}
          </div>
          {fee > 0 && (
            <div className="text-[10px] text-muted-foreground mt-1">
              Incl. admin Rp {fee.toLocaleString("id-ID")}
            </div>
          )}
        </div>
        <div className="glass rounded-2xl border border-border/20 p-4">
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Berlaku</div>
          <PaymentTimer initialSeconds={86400} />
          <div className="text-[10px] text-muted-foreground mt-1">Selama 24 jam</div>
        </div>
      </div>

      {/* Find nearby store */}
      <button className={cn(
        "glass rounded-2xl border p-3.5 flex items-center gap-3 text-sm hover:opacity-80 transition-opacity",
        meta.bg
      )}>
        <MapPin size={16} className={meta.color} />
        <span className={meta.color}>Temukan {methodName} terdekat →</span>
      </button>

      {/* Steps */}
      <div className="glass rounded-2xl border border-border/20 p-5">
        <h3 className="font-bold text-sm mb-3">Cara Bayar di {methodName}</h3>
        <ol className="space-y-2.5">
          {meta.steps.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className={cn("w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5", meta.bg, meta.color)}>
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
      </div>

      {error && (
        <div className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">
          {error}
        </div>
      )}

      <Button
        variant="hero"
        size="lg"
        className="w-full h-14 text-base"
        onClick={handleConfirm}
        disabled={checking}
      >
        {checking ? (
          <><Loader2 size={18} className="animate-spin" /> Memverifikasi...</>
        ) : (
          <><CheckCircle size={18} /> Saya Sudah Bayar</>
        )}
      </Button>
    </div>
  );
};

export default RetailPayment;
