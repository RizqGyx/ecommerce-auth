import Link from "next/link";
import { Dumbbell, Calendar, Clock, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_PT = {
  trainer: { id: "3", name: "Ahmad Rizky", title: "Calisthenics & PT Specialist" },
  package: "Transform",
  sessions: 8,
  sessionsUsed: 3,
  validUntil: "10 Jul 2025",
  nextSession: { date: "Kamis, 3 Jul", time: "09:00", room: "Outdoor Area" },
};

const PTRegistrationWidget = () => {
  const sessionsLeft = MOCK_PT.sessions - MOCK_PT.sessionsUsed;
  const progress = (MOCK_PT.sessionsUsed / MOCK_PT.sessions) * 100;

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
            href={`/coaches/${MOCK_PT.trainer.id}`}
            className="font-bold text-sm hover:text-primary transition-colors"
          >
            {MOCK_PT.trainer.name}
          </Link>
          <p className="text-xs text-muted-foreground truncate">{MOCK_PT.trainer.title}</p>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0">
          {MOCK_PT.package}
        </span>
      </div>

      {/* Sessions progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">Sesi Selesai</span>
          <span className="font-bold">{MOCK_PT.sessionsUsed} / {MOCK_PT.sessions} sesi</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">
          {sessionsLeft} sesi tersisa · Valid hingga {MOCK_PT.validUntil}
        </p>
      </div>

      {/* Next session */}
      <div className="p-3 rounded-xl border border-border/20 mb-4">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-2">
          Sesi Berikutnya
        </p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-primary" />
            <span className="font-semibold">{MOCK_PT.nextSession.date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock size={13} />
            <span>{MOCK_PT.nextSession.time}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{MOCK_PT.nextSession.room}</p>
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
