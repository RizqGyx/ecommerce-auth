"use client";

import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        callbacks: {
          language?: "id" | "en";
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

const CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? "";
// Kept in sync with the server-side environment flag in src/lib/midtrans.ts —
// key prefix isn't a reliable signal for every Midtrans merchant account.
const SNAP_SRC =
  process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true"
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";

interface MidtransPayButtonProps {
  createIntent: () => Promise<{ intentId: string; snapToken: string }>;
  label?: string;
  className?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  buttonClassName?: string;
}

export default function MidtransPayButton({
  createIntent,
  label = "Bayar Sekarang",
  className,
  variant = "hero",
  buttonClassName,
}: MidtransPayButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    setError(null);
    setLoading(true);
    try {
      const { intentId, snapToken } = await createIntent();
      if (!window.snap) throw new Error("Midtrans belum siap dimuat, coba lagi sesaat.");

      window.snap.pay(snapToken, {
        language: "id",
        onSuccess: () => router.push(`/payment/processing?intentId=${intentId}`),
        onPending: () => router.push(`/payment/processing?intentId=${intentId}`),
        onError: () => {
          setError("Pembayaran gagal. Silakan coba lagi.");
          setLoading(false);
        },
        onClose: () => {
          setLoading(false);
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memulai pembayaran.");
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <Script src={SNAP_SRC} data-client-key={CLIENT_KEY} strategy="afterInteractive" />
      <Button
        variant={variant}
        size="lg"
        className={cn("w-full h-12", buttonClassName)}
        onClick={handlePay}
        disabled={loading}
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : label}
      </Button>
      {error && <p className="text-xs text-red-400 mt-2 text-center">{error}</p>}
    </div>
  );
}
