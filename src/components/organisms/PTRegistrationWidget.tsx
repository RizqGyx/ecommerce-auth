import Link from "next/link";
import { Dumbbell, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PTBooking, Coach } from "@/generated/prisma";

interface Props {
  ptBooking: (PTBooking & { coach: Coach }) | null;
}

const PTRegistrationWidget = ({ ptBooking }: Props) => {
  if (!ptBooking) {
    return (
      <div className="glass rounded-2xl border border-border/20 p-5 text-center">
        <div className="p-2.5 rounded-xl bg-primary/10 inline-flex mb-3">
          <Dumbbell size={18} className="text-primary" />
        </div>
        <h3 className="font-bold text-sm mb-1">Belum Punya Paket PT</h3>
        <p className="text-xs text-muted-foreground mb-4">Booking personal trainer untuk latihan 1-on-1.</p>
        <Button variant="hero" size="sm" className="w-full" asChild>
          <Link href="/personal-trainer">Lihat Personal Trainer</Link>
        </Button>
      </div>
    );
  }

  const sessionsLeft = ptBooking.sessionsTotal - ptBooking.sessionsUsed;
  const progress = (ptBooking.sessionsUsed / ptBooking.sessionsTotal) * 100;
  const validUntil = ptBooking.endDate.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="glass rounded-2xl border border-primary/20 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-primary/10">
            <Dumbbell size={16} className="text-primary" />
          </div>
          <h3 className="font-bold text-sm">Personal Trainer Aktif</h3>
        </div>
        <Link href="/personal-trainer" className="text-xs text-primary hover:underline">
          Ubah Paket →
        </Link>
      </div>

      {/* Trainer info */}
      <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-secondary/30">
        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <User size={18} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <Link
            href={`/coaches/${ptBooking.coach.id}`}
            className="font-bold text-sm hover:text-primary transition-colors"
          >
            {ptBooking.coach.name}
          </Link>
          <p className="text-xs text-muted-foreground truncate">{ptBooking.coach.title}</p>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0">
          {ptBooking.packageName}
        </span>
      </div>

      {/* Sessions progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">Sesi Selesai</span>
          <span className="font-bold">{ptBooking.sessionsUsed} / {ptBooking.sessionsTotal} sesi</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">
          {sessionsLeft} sesi tersisa · Valid hingga {validUntil}
        </p>
      </div>

      <Button variant="hero" size="sm" className="w-full" asChild>
        <Link href="/schedule">
          Jadwalkan Sesi <ChevronRight size={14} />
        </Link>
      </Button>
    </div>
  );
};

export default PTRegistrationWidget;
