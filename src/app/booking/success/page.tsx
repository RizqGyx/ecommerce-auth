import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Calendar, Clock, Users, ArrowRight, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ registrationId?: string }>;
}) {
  const { registrationId } = await searchParams;
  const session = await auth();
  if (!session?.user || !registrationId) notFound();

  const registration = await prisma.classRegistration.findUnique({
    where: { id: registrationId },
    include: { session: { include: { classType: true, coach: true } } },
  });

  if (!registration || registration.userId !== session.user.id) notFound();

  const { session: classSession } = registration;
  const dayLabel = classSession.date.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Success icon */}
        <div className="relative mb-6 inline-block">
          <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto">
            <CheckCircle size={48} className="text-primary" />
          </div>
          <div className="absolute inset-0 rounded-full animate-ping bg-primary/5" />
        </div>

        <h1 className="text-3xl font-black mb-2">Booking Berhasil! 🎉</h1>
        <p className="text-muted-foreground mb-8">
          Tempatmu di kelas <strong className="text-foreground">{classSession.classType.name}</strong> telah dikonfirmasi.
          Datanglah 10 menit lebih awal!
        </p>

        {/* Booking card */}
        <div className="glass rounded-2xl border border-primary/20 p-6 text-left mb-6">
          <div className="text-xs font-bold tracking-widest uppercase text-primary/60 mb-1">Referensi Booking</div>
          <div className="font-mono font-black text-lg gradient-text mb-5">
            BKG-{registration.id.slice(-8).toUpperCase()}
          </div>

          <div className="space-y-3">
            {[
              { icon: Calendar, label: "Kelas", value: classSession.classType.name },
              { icon: Users, label: "Pelatih", value: classSession.coach.name },
              { icon: Clock, label: "Jadwal", value: `${dayLabel}, ${classSession.startTime}` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 text-sm">
                <Icon size={15} className="text-primary shrink-0" />
                <span className="text-muted-foreground">{label}</span>
                <span className="font-semibold ml-auto">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border/20 space-y-2 text-sm">
            <div className="flex justify-between font-black">
              <span>Total Dibayar</span>
              <span className="text-primary">Rp {classSession.price.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Button variant="hero" className="flex-1" asChild>
            <Link href="/schedule">
              Lihat Jadwal Lain <ArrowRight size={16} />
            </Link>
          </Button>
          <Button variant="neon" className="flex-1">
            <CalendarPlus size={16} /> Tambah ke Kalender
          </Button>
        </div>

        <Button variant="ghost" asChild>
          <Link href="/dashboard">Kembali ke Dashboard</Link>
        </Button>

        <p className="text-xs text-muted-foreground mt-6">
          Konfirmasi dikirim ke email dan WhatsApp terdaftar.
        </p>
      </div>
    </div>
  );
}
