import Link from "next/link";
import { notFound } from "next/navigation";
import { Dumbbell, User, Package2, ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PtReviewPrompt from "@/components/organisms/PtReviewPrompt";
import CelebrationBurst from "@/components/atoms/CelebrationBurst";

export default async function PTSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string }>;
}) {
  const { bookingId } = await searchParams;
  const session = await auth();
  if (!session?.user || !bookingId) notFound();

  const booking = await prisma.pTBooking.findUnique({
    where: { id: bookingId },
    include: { coach: true },
  });

  if (!booking || booking.userId !== session.user.id) notFound();

  const existingReview = await prisma.review.findUnique({
    where: { userId_ptBookingId: { userId: session.user.id, ptBookingId: booking.id } },
  });

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-6 pb-16">
      <div className="max-w-md w-full text-center">
        {/* Success icon — your trainer partnership is locked in, high-energy feel */}
        <div className="relative mb-6 inline-block">
          <CelebrationBurst colors={["#facc15", "#7c3aed", "#00b8ff"]} />
          <div className="relative w-24 h-24 rounded-full bg-yellow-400/10 border-2 border-yellow-400/40 flex items-center justify-center mx-auto animate-success-pop">
            <Flame size={44} className="text-yellow-400" />
          </div>
          <div className="absolute inset-0 rounded-full animate-ping bg-yellow-400/5" />
        </div>

        <h1 className="text-3xl font-black mb-2">Trainer-mu Siap! 🔥</h1>
        <p className="text-muted-foreground mb-8">
          Paket <strong className="text-foreground">{booking.packageName}</strong> bersama{" "}
          <strong className="text-foreground">{booking.coach.name}</strong> telah aktif.
          Trainer kamu akan menghubungi dalam 24 jam untuk menjadwalkan sesi pertama.
        </p>

        <div className="glass rounded-2xl border border-primary/20 p-6 text-left mb-6">
          <div className="text-xs font-bold tracking-widest uppercase text-primary/60 mb-1">
            Referensi Booking
          </div>
          <div className="font-mono font-black text-lg gradient-text mb-5">
            PT-{booking.id.slice(-8).toUpperCase()}
          </div>

          <div className="space-y-3">
            {[
              { icon: Dumbbell, label: "Paket", value: booking.packageName },
              { icon: User, label: "Trainer", value: booking.coach.name },
              { icon: Package2, label: "Sesi", value: `${booking.sessionsTotal} sesi` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 text-sm">
                <Icon size={15} className="text-primary shrink-0" />
                <span className="text-muted-foreground">{label}</span>
                <span className="font-semibold ml-auto text-right">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border/20 space-y-2 text-sm">
            <div className="flex justify-between font-black">
              <span>Total Dibayar</span>
              <span className="text-primary">Rp {booking.price.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Button variant="hero" className="flex-1" asChild>
            <Link href="/dashboard">
              Ke Dashboard <ArrowRight size={16} />
            </Link>
          </Button>
          <Button variant="neon" className="flex-1" asChild>
            <Link href="/schedule">Lihat Jadwal</Link>
          </Button>
        </div>

        <PtReviewPrompt
          ptBookingId={booking.id}
          coachName={booking.coach.name}
          alreadyReviewed={!!existingReview}
        />

        <p className="text-xs text-muted-foreground mt-6">
          Detail paket dikirim ke email dan WhatsApp terdaftar.
        </p>
      </div>
    </div>
  );
}
