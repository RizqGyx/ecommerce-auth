"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RefreshCw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import QRCodeVisual from "@/components/atoms/QRCodeVisual";
import PaymentTimer from "./PaymentTimer";

interface QRISPaymentProps {
  total: number;
  orderId: string;
  successUrl: string;
  onClearCart?: () => void;
  onConfirm?: () => Promise<string | void>;
}

const QRISPayment = ({ total, orderId, successUrl, onClearCart, onConfirm }: QRISPaymentProps) => {
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const [expired, setExpired] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const qrValue = `S1GPAY:${orderId}:${total}:QRIS`;

  const handleCheck = async () => {
    setChecking(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 2200));
      const redirectUrl = await onConfirm?.();
      onClearCart?.();
      router.push(redirectUrl || successUrl);
    } catch (err) {
      setChecking(false);
      setError(err instanceof Error ? err.message : "Gagal memproses pembayaran.");
    }
  };

  const handleRefresh = () => {
    setExpired(false);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* QR header */}
      <div className="text-center">
        <div className="text-3xl mb-1">⬛</div>
        <h2 className="font-black text-xl">Bayar dengan QRIS</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Scan dengan aplikasi apapun — GoPay, OVO, DANA, mobile banking
        </p>
      </div>

      {/* QR Code card */}
      <div className="relative">
        <div className={`glass rounded-3xl border-2 p-6 flex flex-col items-center gap-4 transition-all ${
          expired ? "border-red-500/30 opacity-50" : "border-primary/30 shadow-xl shadow-primary/10"
        }`}>
          {/* Top bar */}
          <div className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-muted-foreground font-mono">QRIS Nasional</span>
            </div>
            <PaymentTimer key={refreshKey} initialSeconds={900} onExpire={() => setExpired(true)} />
          </div>

          {/* QR */}
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl" />
            <div className="relative bg-white rounded-2xl p-4 shadow-2xl">
              <QRCodeVisual value={qrValue} />
            </div>
          </div>

          {/* Amount */}
          <div className="text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-widest">Total Pembayaran</div>
            <div className="text-3xl font-black gradient-text">
              Rp {total.toLocaleString("id-ID")}
            </div>
          </div>

          {/* Merchant name */}
          <div className="glass rounded-xl px-4 py-2 border border-border/20 text-center">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Merchant</div>
            <div className="font-bold text-sm">S-One Gym Bukittinggi</div>
          </div>
        </div>

        {expired && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-background/80 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-red-400 font-bold mb-3">QR Kode Kedaluwarsa</p>
              <Button variant="neon" size="sm" onClick={handleRefresh}>
                <RefreshCw size={14} /> Generate Ulang
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="w-full glass rounded-2xl border border-border/20 p-5">
        <h3 className="font-bold text-sm mb-3">Cara Bayar</h3>
        <ol className="space-y-2">
          {[
            "Buka aplikasi e-wallet atau mobile banking favoritmu",
            "Pilih menu Scan QR / QRIS",
            "Arahkan kamera ke kode QR di atas",
            "Pastikan nominal sesuai, lalu konfirmasi pembayaran",
            "Klik tombol di bawah setelah pembayaran berhasil",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {error && (
        <div className="w-full px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">
          {error}
        </div>
      )}

      <Button
        variant="hero"
        size="lg"
        className="w-full h-14 text-base"
        onClick={handleCheck}
        disabled={checking || expired}
      >
        {checking ? (
          <><Loader2 size={18} className="animate-spin" /> Memeriksa Pembayaran...</>
        ) : (
          <><CheckCircle size={18} /> Saya Sudah Bayar</>
        )}
      </Button>
    </div>
  );
};

export default QRISPayment;
