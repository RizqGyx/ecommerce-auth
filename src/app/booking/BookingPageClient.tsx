"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { toScheduleSession } from "@/lib/serializers";
import BookingClassCard from "@/components/molecules/BookingClassCard";
import BookingSummaryPanel from "@/components/molecules/BookingSummaryPanel";
import { createClassBookingPaymentIntent } from "./actions";

interface Props {
  session: ReturnType<typeof toScheduleSession>;
  day: string;
  sessionId: string;
}

export default function BookingPageClient({ session, day, sessionId }: Props) {
  const [agreed, setAgreed] = useState(false);

  const total = session?.price ?? 0;

  const handleCreateIntent = () => createClassBookingPaymentIntent(sessionId);

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
          {/* LEFT: Class details */}
          <div className="lg:col-span-3 space-y-5">
            <BookingClassCard session={session} day={day} />

            <div className="glass rounded-2xl border border-border/20 p-6 flex items-center gap-3">
              <ShieldCheck size={18} className="text-green-400 shrink-0" />
              <p className="text-xs text-muted-foreground">
                Pembayaran diproses secara aman melalui Midtrans. Kamu bisa memilih GoPay, OVO, transfer bank,
                kartu kredit/debit, dan metode lainnya di halaman pembayaran.
              </p>
            </div>
          </div>

          {/* RIGHT: Booking summary + confirm */}
          <div className="lg:col-span-2">
            <BookingSummaryPanel
              session={session}
              day={day}
              total={total}
              agreed={agreed}
              onAgree={() => setAgreed((v) => !v)}
              createIntent={handleCreateIntent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
