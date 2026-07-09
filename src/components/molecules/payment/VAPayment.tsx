"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Copy, CheckCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PaymentTimer from "./PaymentTimer";

const BANK_META: Record<string, { prefix: string; color: string; bg: string; logo: string }> = {
  "bca-va":     { prefix: "8277", color: "text-blue-400",   bg: "border-blue-400/20 bg-blue-400/5",   logo: "🏦" },
  "mandiri-va": { prefix: "8887", color: "text-yellow-400", bg: "border-yellow-400/20 bg-yellow-400/5", logo: "🏛️" },
  "bni-va":     { prefix: "8908", color: "text-orange-400", bg: "border-orange-400/20 bg-orange-400/5", logo: "🏦" },
  "bri-va":     { prefix: "8826", color: "text-teal-400",   bg: "border-teal-400/20 bg-teal-400/5",   logo: "🏦" },
};

const ATM_STEPS: Record<string, string[]> = {
  "bca-va": [
    "Masukkan kartu ATM BCA & PIN",
    "Pilih TRANSAKSI LAINNYA → TRANSFER",
    "Pilih KE REKENING BCA VIRTUAL ACCOUNT",
    "Masukkan nomor VA di atas",
    "Pastikan nominal sesuai → konfirmasi",
  ],
  "mandiri-va": [
    "Masukkan kartu ATM Mandiri & PIN",
    "Pilih BAYAR/BELI",
    "Pilih LAINNYA → MULTI PAYMENT",
    "Masukkan kode perusahaan: 88887",
    "Masukkan nomor VA → konfirmasi",
  ],
  "bni-va": [
    "Masukkan kartu ATM BNI & PIN",
    "Pilih MENU LAINNYA → TRANSFER",
    "Pilih VIRTUAL ACCOUNT BILLING",
    "Masukkan nomor VA di atas",
    "Pastikan nominal sesuai → konfirmasi",
  ],
  "bri-va": [
    "Masukkan kartu ATM BRI & PIN",
    "Pilih TRANSAKSI LAIN → PEMBAYARAN",
    "Pilih LAINNYA → BRIVA",
    "Masukkan nomor VA di atas",
    "Pastikan nominal sesuai → konfirmasi",
  ],
};

const MOBILE_STEPS: Record<string, string[]> = {
  "bca-va": [
    "Login ke aplikasi myBCA",
    "Pilih Transfer → BCA Virtual Account",
    "Masukkan nomor VA di atas",
    "Periksa detail & konfirmasi",
  ],
  "mandiri-va": [
    "Login ke Livin' by Mandiri",
    "Pilih Bayar → Multipayment",
    "Masukkan nomor VA → lanjutkan",
    "Periksa detail & konfirmasi",
  ],
  "bni-va": [
    "Login ke BNI Mobile Banking",
    "Pilih Transfer → Virtual Account",
    "Masukkan nomor VA di atas",
    "Periksa detail & konfirmasi",
  ],
  "bri-va": [
    "Login ke BRImo",
    "Pilih Pembayaran → BRIVA",
    "Masukkan nomor VA di atas",
    "Periksa detail & konfirmasi",
  ],
};

interface VAPaymentProps {
  methodId: string;
  methodName: string;
  total: number;
  orderId: string;
  successUrl: string;
  onClearCart?: () => void;
}

const VAPayment = ({ methodId, methodName, total, orderId, successUrl, onClearCart }: VAPaymentProps) => {
  const router = useRouter();
  const meta = BANK_META[methodId] ?? BANK_META["bca-va"];

  const seed = orderId.replace(/\D/g, "").slice(-10).padStart(10, "0");
  const vaNumber = `${meta.prefix}${seed}`;
  const vaFormatted = vaNumber.match(/.{1,4}/g)?.join(" ") ?? vaNumber;

  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"atm" | "mobile" | "internet">("mobile");
  const [checking, setChecking] = useState(false);

  const copyVA = () => {
    navigator.clipboard.writeText(vaNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = async () => {
    setChecking(true);
    await new Promise((r) => setTimeout(r, 2200));
    onClearCart?.();
    router.push(successUrl);
  };

  const stepsAtm = ATM_STEPS[methodId] ?? ATM_STEPS["bca-va"];
  const stepsMobile = MOBILE_STEPS[methodId] ?? MOBILE_STEPS["bca-va"];

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="text-center">
        <div className="text-4xl mb-1">{meta.logo}</div>
        <h2 className="font-black text-xl">{methodName}</h2>
        <p className="text-sm text-muted-foreground">Transfer tepat sesuai nominal agar pembayaran terverifikasi otomatis</p>
      </div>

      {/* VA Number */}
      <div className={`glass rounded-2xl border p-5 ${meta.bg}`}>
        <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Nomor Virtual Account</div>
        <div className="flex items-center gap-3">
          <div className={`font-mono text-2xl font-black tracking-widest flex-1 ${meta.color}`}>{vaFormatted}</div>
          <button
            onClick={copyVA}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all",
              copied
                ? "border-green-400/30 bg-green-400/10 text-green-400"
                : `border-current/30 hover:bg-white/5 ${meta.color}`
            )}
          >
            {copied ? <><Check size={12} /> Disalin</> : <><Copy size={12} /> Salin</>}
          </button>
        </div>
      </div>

      {/* Amount + timer */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-2xl border border-border/20 p-4">
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Total Transfer</div>
          <div className={`text-xl font-black ${meta.color}`}>Rp {total.toLocaleString("id-ID")}</div>
          <div className="text-[10px] text-yellow-400 mt-1">⚠️ Transfer tepat nominal ini</div>
        </div>
        <div className="glass rounded-2xl border border-border/20 p-4">
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Batas Waktu</div>
          <PaymentTimer initialSeconds={86400} />
          <div className="text-[10px] text-muted-foreground mt-1">Berlaku 24 jam</div>
        </div>
      </div>

      {/* Instructions tabs */}
      <div className="glass rounded-2xl border border-border/20 overflow-hidden">
        <div className="flex border-b border-border/20">
          {(["mobile", "atm", "internet"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all",
                tab === t ? `${meta.color} border-b-2 border-current -mb-px` : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "mobile" ? "Mobile Banking" : t === "atm" ? "ATM" : "Internet Banking"}
            </button>
          ))}
        </div>
        <div className="p-5">
          <ol className="space-y-2.5">
            {(tab === "atm" ? stepsAtm : tab === "mobile" ? stepsMobile : [
              `Masuk ke Internet Banking ${methodName.replace("Virtual Account ", "")}`,
              "Pilih Transfer → ke Virtual Account",
              "Masukkan nomor VA di atas",
              "Pastikan nominal sesuai, konfirmasi",
            ]).map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className={cn("w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5", meta.bg, meta.color)}>
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Button
        variant="hero"
        size="lg"
        className="w-full h-14 text-base"
        onClick={handleConfirm}
        disabled={checking}
      >
        {checking ? (
          <><Loader2 size={18} className="animate-spin" /> Memverifikasi Transfer...</>
        ) : (
          <><CheckCircle size={18} /> Konfirmasi Sudah Transfer</>
        )}
      </Button>
    </div>
  );
};

export default VAPayment;
