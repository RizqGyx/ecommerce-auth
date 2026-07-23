"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import QRISPayment from "@/components/molecules/payment/QRISPayment";
import EWalletPayment from "@/components/molecules/payment/EWalletPayment";
import VAPayment from "@/components/molecules/payment/VAPayment";
import CardPayment from "@/components/molecules/payment/CardPayment";
import RetailPayment from "@/components/molecules/payment/RetailPayment";
import { placeOrder } from "@/app/checkout/actions";
import { confirmClassBooking } from "@/app/booking/actions";
import { confirmPtBooking } from "@/app/personal-trainer/book/actions";

function PaymentContent() {
  const params = useSearchParams();
  const { items, clearCart } = useCart();

  const category = params.get("category") ?? "ewallet";
  const method = params.get("method") ?? "gopay";
  const methodName = params.get("methodName") ?? "GoPay";
  const totalStr = params.get("total") ?? "0";
  const feeStr = params.get("fee") ?? "0";
  const type = params.get("type") ?? "shop";
  const orderId = params.get("orderId") ?? `S1G-${Date.now().toString(36).toUpperCase()}`;

  const total = parseInt(totalStr, 10);
  const fee = parseInt(feeStr, 10);

  // Build back URL and success URL based on payment type
  const backUrl = type === "pt" ? "/personal-trainer/book" : type === "booking" ? "/booking" : "/checkout";

  let successUrl: string;
  if (type === "pt") {
    const ref = params.get("ref") ?? `PT-${Date.now().toString(36).toUpperCase()}`;
    const trainerName = params.get("trainerName") ?? "";
    const packageName = params.get("package") ?? "";
    successUrl = `/personal-trainer/success?ref=${ref}&trainer=${encodeURIComponent(trainerName)}&package=${encodeURIComponent(packageName)}&total=${total}&method=${encodeURIComponent(methodName)}`;
  } else if (type === "booking") {
    const ref = params.get("ref") ?? `BKG-${Date.now().toString(36).toUpperCase()}`;
    const cls = params.get("class") ?? "";
    const day = params.get("day") ?? "";
    const time = params.get("time") ?? "";
    const coach = params.get("coach") ?? "";
    successUrl = `/booking/success?ref=${ref}&class=${encodeURIComponent(cls)}&day=${day}&time=${time}&coach=${encodeURIComponent(coach)}&total=${total}&method=${encodeURIComponent(methodName)}`;
  } else {
    successUrl = `/checkout/success?orderId=${orderId}&total=${total}&method=${encodeURIComponent(methodName)}`;
  }

  const onClearCart = type === "shop" ? clearCart : undefined;

  const onConfirm = async (): Promise<string | void> => {
    if (type === "pt") {
      const coachId = params.get("coachId") ?? "";
      const packageId = params.get("packageId") ?? "";
      const booking = await confirmPtBooking(coachId, packageId);
      return `${successUrl}&bookingId=${booking.id}`;
    } else if (type === "booking") {
      const sessionId = params.get("sessionId") ?? "";
      await confirmClassBooking(sessionId);
    } else {
      await placeOrder(
        orderId,
        items.map((i) => ({ productId: i.id, quantity: i.quantity })),
        methodName
      );
    }
  };

  const renderPayment = () => {
    switch (category) {
      case "qris":
        return (
          <QRISPayment
            total={total}
            orderId={orderId}
            successUrl={successUrl}
            onClearCart={onClearCart}
            onConfirm={onConfirm}
          />
        );
      case "ewallet":
        return (
          <EWalletPayment
            methodId={method}
            methodName={methodName}
            total={total}
            successUrl={successUrl}
            onClearCart={onClearCart}
            onConfirm={onConfirm}
          />
        );
      case "bank":
        return (
          <VAPayment
            methodId={method}
            methodName={methodName}
            total={total}
            orderId={orderId}
            successUrl={successUrl}
            onClearCart={onClearCart}
            onConfirm={onConfirm}
          />
        );
      case "card":
        return (
          <CardPayment
            total={total}
            successUrl={successUrl}
            onClearCart={onClearCart}
            onConfirm={onConfirm}
          />
        );
      case "retail":
        return (
          <RetailPayment
            methodId={method}
            methodName={methodName}
            total={total}
            fee={fee}
            orderId={orderId}
            successUrl={successUrl}
            onClearCart={onClearCart}
            onConfirm={onConfirm}
          />
        );
      default:
        return (
          <div className="text-center py-12 text-muted-foreground">
            Metode pembayaran tidak dikenali.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-lg mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href={backUrl}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} /> Kembali
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck size={13} className="text-green-400" />
            <span>Pembayaran Aman</span>
          </div>
        </div>

        {/* Payment card container */}
        <div className="glass rounded-3xl border border-border/20 p-6 shadow-2xl">
          {renderPayment()}
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 mt-6 text-[10px] text-muted-foreground/60">
          <span>SSL 256-bit</span>
          <span>•</span>
          <span>Midtrans Secured</span>
          <span>•</span>
          <span>PCI DSS</span>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
