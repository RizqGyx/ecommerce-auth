"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentMethodCard, { PAYMENT_METHODS, CATEGORY_LABELS } from "@/components/molecules/PaymentMethodCard";
import { SCHEDULE } from "@/lib/data";
import BookingClassCard from "@/components/molecules/BookingClassCard";
import BookingSummaryPanel from "@/components/molecules/BookingSummaryPanel";

const BOOKING_CATEGORIES = ["qris", "ewallet", "bank", "card"] as const;

function BookingContent() {
  const router = useRouter();
  const params = useSearchParams();
  const day       = params.get("day") ?? "Monday";
  const sessionId = params.get("sessionId");

  const session = (SCHEDULE[day] ?? []).find((s) => s.id === sessionId);

  const [paymentId, setPaymentId] = useState("gopay");
  const [agreed,    setAgreed]    = useState(false);

  const selectedPayment = PAYMENT_METHODS.find((p) => p.id === paymentId) ?? PAYMENT_METHODS[0];
  const fee   = selectedPayment.fee ?? 0;
  const total = (session?.price ?? 0) + fee;

  const grouped = PAYMENT_METHODS.reduce<Record<string, typeof PAYMENT_METHODS>>((acc, m) => {
    if (!acc[m.category]) acc[m.category] = [];
    acc[m.category].push(m);
    return acc;
  }, {});

  if (!session) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Sesi kelas tidak ditemukan.</p>
          <Button variant="hero" asChild><Link href="/schedule">Kembali ke Jadwal</Link></Button>
        </div>
      </div>
    );
  }

  const handleBook = () => {
    if (!agreed) return;
    const ref = `BKG-${Date.now().toString(36).toUpperCase()}`;
    router.push(`/payment?${new URLSearchParams({
      category:   selectedPayment.category,
      method:     selectedPayment.id,
      methodName: selectedPayment.name,
      total:      String(total),
      fee:        String(fee),
      type:       "booking",
      ref,
      class:      session.class,
      day,
      time:       session.time,
      coach:      session.coach,
    })}`);
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link href="/schedule" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft size={14} /> Kembali ke Jadwal
        </Link>

        <h1 className="text-3xl font-black mb-8">
          Booking <span className="gradient-text">Kelas</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* LEFT: Class details + payment method */}
          <div className="lg:col-span-3 space-y-5">
            <BookingClassCard session={session} day={day} />

            {/* Payment method selection */}
            <div className="glass rounded-2xl border border-border/20 p-6">
              <h3 className="font-bold flex items-center gap-2 mb-5">
                <CreditCard size={18} className="text-primary" /> Metode Pembayaran
              </h3>
              <div className="space-y-5">
                {BOOKING_CATEGORIES.map((cat) =>
                  grouped[cat] ? (
                    <div key={cat}>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                        {CATEGORY_LABELS[cat]}
                      </div>
                      <div className="space-y-2">
                        {grouped[cat].map((m) => (
                          <PaymentMethodCard key={m.id} method={m} selected={paymentId === m.id} onSelect={setPaymentId} />
                        ))}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Booking summary + confirm */}
          <div className="lg:col-span-2">
            <BookingSummaryPanel
              session={session}
              day={day}
              fee={fee}
              total={total}
              agreed={agreed}
              onAgree={() => setAgreed((v) => !v)}
              onBook={handleBook}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-muted-foreground">Memuat...</div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
