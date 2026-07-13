import Link from "next/link";
import { ChevronRight, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

interface ClassEntry {
  class: string;
  coach: string;
  date: string;
  time: string;
  room: string;
  color: string;
  icon: string;
}

interface Props {
  classes: ClassEntry[];
}

const UpcomingClassesWidget = ({ classes }: Props) => {
  const [next, ...rest] = classes;

  return (
    <div className="glass rounded-2xl border border-border/20 overflow-hidden">
      <div className="flex items-center justify-between p-5 pb-0">
        <div className="flex items-center gap-2">
          <h3 className="font-bold">Upcoming Classes</h3>
          {classes.length > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              {classes.length} terjadwal
            </span>
          )}
        </div>
        <Link href="/schedule" className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
          View all <ChevronRight size={12} />
        </Link>
      </div>

      {!next ? (
        <div className="p-8 text-center">
          <Calendar size={28} className="text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Belum ada kelas terjadwal.</p>
          <Link href="/schedule" className="text-xs text-primary hover:underline mt-1 inline-block">
            Booking kelas sekarang →
          </Link>
        </div>
      ) : (
        <div className="p-5 pt-4 space-y-3">
          {/* Featured: next class */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${next.color} opacity-90`} />
            <div className="absolute inset-0 hologram-lines opacity-10" />
            <div className="relative z-10 p-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-3xl shrink-0">
                {next.icon}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Sesi Berikutnya</span>
                <h4 className="text-lg font-black text-white leading-tight truncate">{next.class}</h4>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-white/80 mt-1">
                  <span className="flex items-center gap-1"><Clock size={11} /> {next.time}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} /> {next.room}</span>
                </div>
              </div>
              <div className="text-right shrink-0 hidden sm:block">
                <div className="text-xs font-bold text-white">{next.date}</div>
                <div className="text-[10px] text-white/70">with {next.coach}</div>
              </div>
            </div>
          </div>

          {/* Remaining, compact */}
          {rest.map((cls, i) => (
            <div key={i} className="group flex items-center gap-3.5 px-2 py-2 rounded-xl hover:bg-white/5 transition-colors">
              <div className={`w-1 h-9 rounded-full bg-gradient-to-b ${cls.color} shrink-0`} />
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${cls.color} flex items-center justify-center shrink-0 text-base opacity-90`}>
                {cls.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{cls.class}</div>
                <div className="text-xs text-muted-foreground truncate">with {cls.coach} · {cls.room}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs font-semibold">{cls.time}</div>
                <div className="text-[10px] text-muted-foreground">{cls.date}</div>
              </div>
              <ArrowRight size={13} className="text-muted-foreground/0 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingClassesWidget;
