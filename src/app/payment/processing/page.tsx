"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, XCircle, RefreshCcw } from "lucide-react";
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
    setPhase("polling");
  };

  if (!intentId) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">Tidak ada transaksi yang diproses.</p>
        <Button variant="hero" className="mt-4" asChild>
          <Link href="/dashboard">Ke Dashboard</Link>
        </Button>
      </div>
    );
  }

  if (phase === "failed") {
    return (
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-red-400/10 border-2 border-red-400/30 flex items-center justify-center mx-auto mb-6">
          <XCircle size={40} className="text-red-400" />
        </div>
        <h1 className="text-2xl font-black mb-2">Pembayaran Gagal</h1>
        <p className="text-muted-foreground mb-6">
          Transaksi tidak berhasil diselesaikan. Silakan coba lagi.
        </p>
        <Button variant="hero" asChild>
          <Link href={BACK_URL[type] ?? "/dashboard"}>
            <RefreshCcw size={16} /> Coba Lagi
          </Link>
        </Button>
      </div>
    );
  }

  if (phase === "timeout") {
    return (
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-yellow-400/10 border-2 border-yellow-400/30 flex items-center justify-center mx-auto mb-6">
          <Loader2 size={40} className="text-yellow-400" />
        </div>
        <h1 className="text-2xl font-black mb-2">Sedang Diproses</h1>
        <p className="text-muted-foreground mb-6">
          Pembayaranmu sedang diproses. Ini bisa memakan waktu lebih lama untuk beberapa metode
          pembayaran (mis. transfer bank). Kami akan update statusnya begitu dikonfirmasi.
        </p>
        <Button variant="hero" onClick={handleManualRefresh}>
          <RefreshCcw size={16} /> Cek Status Lagi
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-6">
        <Loader2 size={40} className="text-primary animate-spin" />
      </div>
      <h1 className="text-2xl font-black mb-2">Memverifikasi Pembayaran</h1>
      <p className="text-muted-foreground">Mohon tunggu sebentar, jangan tutup halaman ini...</p>
    </div>
  );
}

export default function PaymentProcessingPage() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <Suspense
          fallback={
            <div className="flex items-center justify-center">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          }
        >
          <ProcessingContent />
        </Suspense>
      </div>
    </div>
  );
}
