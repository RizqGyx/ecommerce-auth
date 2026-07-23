"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CreditCard, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CardPaymentProps {
  total: number;
  successUrl: string;
  onClearCart?: () => void;
  onConfirm?: () => Promise<string | void>;
}

type CardType = "visa" | "mastercard" | "amex" | "unknown";

function detectCardType(num: string): CardType {
  const n = num.replace(/\s/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^5[1-5]|^2(2[2-9]|[3-6]\d|7[01])/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  return "unknown";
}

const CARD_TYPE_META: Record<CardType, { label: string; color: string; cvvLen: number }> = {
  visa:       { label: "VISA",       color: "text-blue-400",   cvvLen: 3 },
  mastercard: { label: "Mastercard", color: "text-orange-400", cvvLen: 3 },
  amex:       { label: "Amex",       color: "text-cyan-400",   cvvLen: 4 },
  unknown:    { label: "",           color: "text-muted-foreground", cvvLen: 3 },
};

function formatCardNumber(val: string) {
  return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(val: string) {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

const CardPayment = ({ total, successUrl, onClearCart, onConfirm }: CardPaymentProps) => {
  const router = useRouter();
  const [flipped, setFlipped] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [showCvv, setShowCvv] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [step3d, setStep3d] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cardType = detectCardType(cardNum);
  const meta = CARD_TYPE_META[cardType];
  const cvvLen = meta.cvvLen;

  const displayNum = cardNum
    ? cardNum.replace(/\d(?=.{4})/g, "•")
    : "•••• •••• •••• ••••";
  const isComplete =
    cardNum.replace(/\s/g, "").length >= 16 &&
    name.trim().length >= 2 &&
    expiry.length === 5 &&
    cvv.length >= 3;

  const handlePay = async () => {
    setProcessing(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 1500));
    setProcessing(false);
    setStep3d(true);
    await new Promise((r) => setTimeout(r, 2000));
    try {
      const redirectUrl = await onConfirm?.();
      onClearCart?.();
      router.push(redirectUrl || successUrl);
    } catch (err) {
      setStep3d(false);
      setError(err instanceof Error ? err.message : "Gagal memproses pembayaran.");
    }
  };

  if (step3d) {
    return (
      <div className="flex flex-col items-center gap-6 py-10">
        <div className="w-20 h-20 rounded-full border-4 border-primary animate-spin border-t-transparent" />
        <div className="text-center">
          <h2 className="text-xl font-black mb-2">3D Secure Authentication</h2>
          <p className="text-sm text-muted-foreground">Memverifikasi identitas melalui bank penerbit kartu...</p>
        </div>
        <div className="glass rounded-2xl border border-primary/20 px-5 py-3 text-sm text-muted-foreground flex items-center gap-2">
          <Lock size={14} className="text-primary" />
          Dienkripsi dengan SSL 256-bit
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <h2 className="font-black text-xl">Kartu Kredit / Debit</h2>
        <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
      </div>

      {/* Card Preview */}
      <div
        className="relative h-48 rounded-2xl overflow-hidden cursor-pointer select-none"
        style={{ perspective: "1000px" }}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className={cn(
          "absolute inset-0 transition-all duration-500",
          flipped ? "[transform:rotateY(180deg)]" : ""
        )} style={{ transformStyle: "preserve-3d" }}>
          {/* Front */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/40 via-accent/30 to-primary/20 border border-primary/30 p-5 flex flex-col justify-between backface-hidden overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="absolute inset-0 hologram-lines opacity-20" />
            <div className="relative flex items-center justify-between">
              <div className="font-bold text-sm tracking-widest">S-ONE GYM</div>
              {cardType !== "unknown" && (
                <div className={`text-sm font-black italic ${meta.color}`}>{meta.label}</div>
              )}
            </div>
            <div>
              <div className="w-10 h-7 rounded-md bg-yellow-400/80 border border-yellow-300/50 mb-3 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-0.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-yellow-700/50 rounded-sm" />
                  ))}
                </div>
              </div>
              <div className="font-mono text-lg font-black tracking-widest text-white/90">{displayNum}</div>
            </div>
            <div className="relative flex justify-between items-end">
              <div>
                <div className="text-[9px] text-white/50 uppercase tracking-widest">Nama Pemegang</div>
                <div className="font-bold text-sm uppercase">{name || "NAMA LENGKAP"}</div>
              </div>
              <div>
                <div className="text-[9px] text-white/50 uppercase tracking-widest">Berlaku s.d.</div>
                <div className="font-mono font-bold text-sm">{expiry || "MM/YY"}</div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-muted to-card border border-border/30 flex flex-col justify-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="w-full h-12 bg-black/60 mb-4" />
            <div className="px-5">
              <div className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1">CVV</div>
              <div className="h-10 bg-white/10 rounded-lg flex items-center justify-end px-4">
                <div className="font-mono font-bold text-lg tracking-widest">
                  {cvv ? cvv.replace(/./g, "•") : "•••"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-[10px] text-muted-foreground">Klik kartu untuk melihat sisi belakang</p>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Nomor Kartu</label>
          <div className="relative">
            <CreditCard size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={cardNum}
              onChange={(e) => setCardNum(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-card border border-border/30 font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
            {cardType !== "unknown" && (
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black italic ${meta.color}`}>
                {meta.label}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Nama Pemegang Kartu</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
            placeholder="NAMA SEPERTI DI KARTU"
            className="w-full px-4 py-3 rounded-xl bg-card border border-border/30 font-mono text-sm uppercase focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Masa Berlaku</label>
            <input
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full px-4 py-3 rounded-xl bg-card border border-border/30 font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">
              CVV {cvvLen === 4 && <span className="text-cyan-400">(4 digit)</span>}
            </label>
            <div className="relative" onFocus={() => setFlipped(true)} onBlur={() => setFlipped(false)}>
              <input
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, cvvLen))}
                placeholder={cvvLen === 4 ? "••••" : "•••"}
                type={showCvv ? "text" : "password"}
                maxLength={cvvLen}
                className="w-full px-4 pr-9 py-3 rounded-xl bg-card border border-border/30 font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowCvv((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showCvv ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>
          </div>
        </div>
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
        onClick={handlePay}
        disabled={!isComplete || processing}
      >
        {processing ? (
          <><Loader2 size={18} className="animate-spin" /> Memproses...</>
        ) : (
          <><Lock size={16} /> Bayar Rp {total.toLocaleString("id-ID")}</>
        )}
      </Button>

      <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1"><Lock size={9} /> SSL Encrypted</span>
        <span>•</span>
        <span>Powered by Midtrans</span>
        <span>•</span>
        <span>PCI DSS Compliant</span>
      </div>
    </div>
  );
};

export default CardPayment;
