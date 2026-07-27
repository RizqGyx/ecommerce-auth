"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, XCircle, RefreshCcw, Clock3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { pollPaymentIntent } from "./actions";

const MAX_ATTEMPTS = 30;
const POLL_INTERVAL_MS = 2000;

const SUCCESS_REDIRECT: Record<string, (resultRef: string) => string> = {
  SHOP: (resultRef) => `/checkout/success?orderId=${resultRef}`,
  CLASS_BOOKING: (resultRef) => `/booking/success?registrationId=${resultRef}`,
  PT_BOOKING: (resultRef) => `/personal-trainer/success?bookingId=${resultRef}`,
  MEMBERSHIP: () => `/dashboard`,
};

const BACK_URL: Record<string, string> = {
  SHOP: "/checkout",
  CLASS_BOOKING: "/schedule",
  PT_BOOKING: "/personal-trainer/book",
  MEMBERSHIP: "/membership",
};

type Phase = "polling" | "failed" | "timeout";

function ProcessingContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const intentId = params.get("intentId") ?? "";

  const [phase, setPhase] = useState<Phase>("polling");
  const [type, setType] = useState<string>("");
  const [attempt, setAttempt] = useState(0);
  const attemptsRef = useRef(0);
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (!intentId) return;
    cancelledRef.current = false;

    const poll = async () => {
      if (cancelledRef.current) return;
      try {
        const result = await pollPaymentIntent(intentId);
        setType(result.type);

        if (result.status === "SUCCESS" && result.resultRef) {
          if (result.type === "SHOP") clearCart();
          router.push(SUCCESS_REDIRECT[result.type]?.(result.resultRef) ?? "/dashboard");
          return;
        }

        if (result.status === "FAILED") {
          setPhase("failed");
          return;
        }
      } catch {
        // transient error while polling — keep trying until attempt cap
      }

      attemptsRef.current += 1;
      setAttempt(attemptsRef.current);
      if (attemptsRef.current >= MAX_ATTEMPTS) {
        setPhase("timeout");
        return;
      }
      setTimeout(poll, POLL_INTERVAL_MS);
    };

    poll();

    return () => {
      cancelledRef.current = true;
    };
  }, [intentId, router]);

  const handleManualRefresh = () => {
    attemptsRef.current = 0;
    setAttempt(0);
    setPhase("polling");
  };

  if (!intentId) {
    return (
      <ProcessingShell>
        <p className="text-muted-foreground">Tidak ada transaksi yang diproses.</p>
        <Button variant="hero" className="mt-6" asChild>
          <Link href="/dashboard">Ke Dashboard</Link>
        </Button>
      </ProcessingShell>
    );
  }

  if (phase === "failed") {
    return (
      <ProcessingShell>
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-400/10 border border-red-400/25 mb-7">
          <XCircle size={36} className="text-red-400" />
        </div>
        <h1 className="text-2xl font-black mb-2">Pembayaran Gagal</h1>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs mx-auto">
          Transaksi tidak berhasil diselesaikan. Belum ada biaya yang terpotong — silakan coba lagi.
        </p>
        <Button variant="hero" size="lg" className="w-full" asChild>
          <Link href={BACK_URL[type] ?? "/dashboard"}>
            <RefreshCcw size={16} /> Coba Lagi
          </Link>
        </Button>
      </ProcessingShell>
    );
  }

  if (phase === "timeout") {
    return (
      <ProcessingShell>
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-yellow-400/10 border border-yellow-400/25 mb-7">
          <Clock3 size={34} className="text-yellow-400" />
        </div>
        <h1 className="text-2xl font-black mb-2">Masih Diproses</h1>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs mx-auto">
          Beberapa metode pembayaran (mis. transfer bank) butuh waktu lebih lama untuk dikonfirmasi.
          Kami akan update statusmu otomatis — atau cek lagi sekarang.
        </p>
        <Button variant="hero" size="lg" className="w-full" onClick={handleManualRefresh}>
          <RefreshCcw size={16} /> Cek Status Lagi
        </Button>
      </ProcessingShell>
    );
  }

  const progressPct = Math.min(100, Math.round((attempt / MAX_ATTEMPTS) * 100));

  return (
    <ProcessingShell>
      <div className="relative inline-flex items-center justify-center w-20 h-20 mb-7">
        <div className="absolute inset-0 rounded-full bg-primary/15 blur-xl animate-pulse" />
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-2 border-t-primary border-r-primary/40 border-b-transparent border-l-transparent animate-spin" />
        <Loader2 size={30} className="text-primary" />
      </div>

      <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-primary mb-3">
        Midtrans Secure Checkout
      </span>
      <h1 className="text-2xl font-black mb-2">Memverifikasi Pembayaran</h1>
      <p className="text-muted-foreground leading-relaxed mb-6 max-w-xs mx-auto">
        Mohon tunggu sebentar, jangan tutup halaman ini...
      </p>

      <div className="h-1 w-full rounded-full bg-border/20 overflow-hidden mb-2">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out rounded-full"
          style={{ width: `${Math.max(6, progressPct)}%` }}
        />
      </div>
      <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">
        Memeriksa status transaksi...
      </p>
    </ProcessingShell>
  );
}

function ProcessingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden glass rounded-3xl border border-border/20 p-8 lg:p-10 text-center shadow-2xl shadow-black/40">
      <div className="absolute inset-0 hologram-lines opacity-[0.08] pointer-events-none" />
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function PaymentProcessingPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-accent/6 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          }
        >
          <ProcessingContent />
        </Suspense>

        <div className="flex items-center justify-center gap-2 mt-6 text-[10px] text-muted-foreground/60">
          <ShieldCheck size={12} className="text-green-400" />
          <span>Transaksi diproses secara aman melalui Midtrans</span>
        </div>
      </div>
    </div>
  );
}
