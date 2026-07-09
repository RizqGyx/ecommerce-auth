"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Smartphone, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentTimer from "./PaymentTimer";

const WALLET_META: Record<string, { emoji: string; color: string; bg: string; deeplink: string }> = {
  gopay:     { emoji: "🟢", color: "text-green-400",  bg: "border-green-400/30 bg-green-400/5",  deeplink: "gojek://gopay" },
  ovo:       { emoji: "🟣", color: "text-purple-400", bg: "border-purple-400/30 bg-purple-400/5", deeplink: "ovo://app" },
  dana:      { emoji: "🔵", color: "text-blue-400",   bg: "border-blue-400/30 bg-blue-400/5",   deeplink: "dana://app" },
  shopeepay: { emoji: "🟠", color: "text-orange-400", bg: "border-orange-400/30 bg-orange-400/5", deeplink: "shopeeid://app" },
};

interface EWalletPaymentProps {
  methodId: string;
  methodName: string;
  total: number;
  successUrl: string;
  onClearCart?: () => void;
}

const EWalletPayment = ({ methodId, methodName, total, successUrl, onClearCart }: EWalletPaymentProps) => {
  const router = useRouter();
  const meta = WALLET_META[methodId] ?? WALLET_META.gopay;

  const [phone, setPhone] = useState("+62 812-3456-7890");
  const [step, setStep] = useState<"input" | "waiting" | "checking">("input");
  const [checking, setChecking] = useState(false);

  const handleSend = () => setStep("waiting");

  const handleConfirm = async () => {
    setChecking(true);
    await new Promise((r) => setTimeout(r, 2000));
    onClearCart?.();
    router.push(successUrl);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="text-center">
        <div className="text-5xl mb-2">{meta.emoji}</div>
        <h2 className="font-black text-xl">Bayar dengan {methodName}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Pembayaran instan ke akun {methodName}
        </p>
      </div>

      {step === "input" && (
        <>
          {/* Amount */}
          <div className={`glass rounded-2xl border p-5 text-center ${meta.bg}`}>
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Total Pembayaran</div>
            <div className={`text-4xl font-black ${meta.color}`}>
              Rp {total.toLocaleString("id-ID")}
            </div>
          </div>

          {/* Phone input */}
          <div className="glass rounded-2xl border border-border/20 p-5">
            <label className="text-sm font-semibold mb-3 flex items-center gap-2 block">
              <Smartphone size={16} className="text-primary" />
              Nomor HP terdaftar di {methodName}
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+62 8xx-xxxx-xxxx"
              className="w-full px-4 py-3 rounded-xl bg-card border border-border/30 text-base font-mono focus:outline-none focus:border-primary/50 transition-colors"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Notifikasi pembayaran akan dikirim ke nomor ini
            </p>
          </div>

          <Button variant="hero" size="lg" className="w-full h-14 text-base" onClick={handleSend}>
            Kirim Permintaan Bayar
          </Button>

          <div className={`flex items-center justify-center gap-2 text-sm font-medium ${meta.color}`}>
            <ExternalLink size={14} />
            <span>atau buka aplikasi {methodName} langsung</span>
          </div>
        </>
      )}

      {step === "waiting" && (
        <>
          {/* Waiting state */}
          <div className={`glass rounded-2xl border p-6 text-center ${meta.bg}`}>
            <div className="text-5xl mb-3 animate-bounce">{meta.emoji}</div>
            <div className={`text-2xl font-black ${meta.color} mb-1`}>
              Rp {total.toLocaleString("id-ID")}
            </div>
            <p className="text-sm text-muted-foreground">
              Notifikasi dikirim ke <strong className="text-foreground">{phone}</strong>
            </p>
          </div>

          <div className="glass rounded-2xl border border-border/20 p-5 flex items-start gap-3">
            <PaymentTimer initialSeconds={900} />
            <div>
              <div className="font-semibold text-sm">Sisa Waktu Pembayaran</div>
              <div className="text-xs text-muted-foreground">Buka notifikasi {methodName} di HP-mu dan konfirmasi pembayaran</div>
            </div>
          </div>

          <div className="glass rounded-2xl border border-border/20 p-5">
            <h3 className="font-bold text-sm mb-3">Cara Bayar</h3>
            <ol className="space-y-2">
              {[
                `Buka aplikasi ${methodName} di HP-mu`,
                "Kamu akan menerima notifikasi pembayaran",
                `Ketuk notifikasi dan konfirmasi di aplikasi ${methodName}`,
                "Kembali ke sini dan klik tombol Konfirmasi di bawah",
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${meta.bg} ${meta.color}`}>
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

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
              <><CheckCircle size={18} /> Konfirmasi Sudah Bayar</>
            )}
          </Button>
        </>
      )}
    </div>
  );
};

export default EWalletPayment;
