"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Users, ChevronRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ClassType } from "@/generated/prisma";
import type { toScheduleSession } from "@/lib/serializers";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAY_SHORT: Record<string, string> = {
  Monday: "Sen", Tuesday: "Sel", Wednesday: "Rab", Thursday: "Kam",
  Friday: "Jum", Saturday: "Sab", Sunday: "Min",
};

type ScheduleSession = ReturnType<typeof toScheduleSession>;

function timeToDecimalHour(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h + m / 60;
}

const PX_PER_HOUR = 100;

export default function SchedulePageClient({
  classTypes,
  scheduleByDay,
  dayDates,
}: {
  classTypes: ClassType[];
  scheduleByDay: Record<string, ScheduleSession[]>;
  dayDates: Record<string, string>;
}) {
  const CLASS_FILTER_OPTIONS = ["Semua Kelas", ...classTypes.map((c) => c.name)];

  // Build color + icon lookup from classTypes
  const CLASS_META: Record<string, { color: string; icon: string }> = {};
  classTypes.forEach((c) => {
    CLASS_META[c.name] = { color: c.color ?? "from-primary to-accent", icon: c.icon ?? "🏋️" };
  });

  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const [activeDay, setActiveDay] = useState<string>(DAYS.includes(todayName) ? todayName : "Monday");
  const [classFilter, setClassFilter] = useState("Semua Kelas");

  const allSessions = scheduleByDay[activeDay] ?? [];
  const sessions = allSessions.filter(
    (s) => classFilter === "Semua Kelas" || s.class === classFilter
  );

  // Real time-of-day scale for the desktop timeline — each session block's
  // position and height reflect its actual start time and duration.
  const dayStartHour = sessions.length > 0 ? Math.floor(Math.min(...sessions.map((s) => timeToDecimalHour(s.time)))) : 6;
  const dayEndHour = sessions.length > 0 ? Math.ceil(Math.max(...sessions.map((s) => timeToDecimalHour(s.endTime)))) : 22;
  const hourMarks = Array.from({ length: dayEndHour - dayStartHour + 1 }, (_, i) => dayStartHour + i);
  const timelineHeight = (dayEndHour - dayStartHour) * PX_PER_HOUR;

  return (
    <div className="min-h-screen pt-20 bg-[#0a0a0a]">
      {/* ── Compact Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-12 lg:py-16">
        <Image
          src="/gym/interior-wide.jpg"
          alt="Interior S-One Gym"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-b from-accent/8 via-primary/4 to-transparent" />
        <div className="absolute inset-0 hologram-lines opacity-10" />
        <div className="absolute top-0 right-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-1/3 w-60 h-60 bg-accent/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-xs font-bold tracking-widest uppercase text-accent mb-4">
                <CalendarDays size={11} />
                Jadwal Mingguan
              </div>
              <h1 className="text-4xl lg:text-6xl font-black leading-none mb-3 tracking-tight">
                Jadwal <span className="gradient-text">Kelas</span>
              </h1>
              <p className="text-muted-foreground">
                Amankan tempatmu — sesi cepat penuh. Booking dari sekarang.
              </p>
            </div>

            {/* Today stats */}
            <div className="flex items-center gap-4 glass rounded-2xl px-6 py-4 border border-border/20 shrink-0">
              <div className="text-center">
                <div className="text-2xl font-black gradient-text">{allSessions.length}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Kelas hari ini</div>
              </div>
              <div className="w-px h-10 bg-border/40" />
              <div className="text-center">
                <div className="text-2xl font-black text-foreground">
                  {allSessions.reduce((acc, s) => acc + (s.capacity - s.enrolled), 0)}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Slot tersisa</div>
              </div>
              <div className="w-px h-10 bg-border/40" />
              <div className="text-center">
                <div className="text-xs font-bold text-primary uppercase tracking-wide">Jun–Jul</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Minggu ke-27</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Day Selector — Calendar Week Style ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <div className="grid grid-cols-7 gap-2">
          {DAYS.map((day) => {
            const hasClasses = (scheduleByDay[day] ?? []).length > 0;
            const isActive = activeDay === day;
            const isToday = day === todayName;
            const count = (scheduleByDay[day] ?? []).length;

            return (
              <button
                key={day}
                onClick={() => hasClasses && setActiveDay(day)}
                disabled={!hasClasses}
                className={`relative flex flex-col items-center gap-1 py-3 rounded-xl border text-center transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-b from-primary/25 to-accent/15 border-primary/50 shadow-[0_0_20px_hsl(195_100%_50%/0.2)]"
                    : hasClasses
                    ? "glass border-border/20 hover:border-primary/30 hover:bg-primary/5 cursor-pointer"
                    : "glass border-border/10 opacity-35 cursor-default"
                }`}
              >
                {isToday && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_hsl(195_100%_50%/0.8)]" />
                )}
                <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {DAY_SHORT[day]}
                </span>
                <span className={`text-lg font-black ${isActive ? "text-foreground" : "text-foreground/70"}`}>
                  {dayDates[day]}
                </span>
                {hasClasses ? (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                ) : (
                  <span className="text-[9px] text-muted-foreground/40">—</span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Class Filter Pills ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pt-4 pb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CLASS_FILTER_OPTIONS.map((opt) => {
            const meta = CLASS_META[opt];
            const isActive = classFilter === opt;
            return (
              <button
                key={opt}
                onClick={() => setClassFilter(opt)}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                  isActive
                    ? "bg-primary/20 text-primary border-primary/50 shadow-[0_0_10px_hsl(195_100%_50%/0.2)]"
                    : "glass border-border/20 text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {meta && <span className="text-sm leading-none">{meta.icon}</span>}
                {opt}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Timeline View ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-10">
        {sessions.length === 0 ? (
          <div className="text-center py-24 glass rounded-2xl border border-border/20">
            <div className="text-5xl mb-4">📅</div>
            <p className="text-muted-foreground text-lg font-medium">Tidak ada kelas yang sesuai dengan filtermu.</p>
            <p className="text-muted-foreground/60 text-sm mt-1">Coba hari atau jenis kelas lain.</p>
          </div>
        ) : (
          <>
            {/* Desktop: a real time-scaled timeline — block position & height reflect actual start time and duration */}
            <div className="hidden lg:block relative" style={{ height: `${timelineHeight}px` }}>
              {hourMarks.map((hour) => (
                <div
                  key={hour}
                  className="absolute left-0 right-0 flex items-start gap-3"
                  style={{ top: `${(hour - dayStartHour) * PX_PER_HOUR}px` }}
                >
                  <div className="w-16 shrink-0 -translate-y-2 text-right pr-2">
                    <span className="text-[10px] font-bold text-muted-foreground/50 tabular-nums inline-flex items-center gap-1">
                      <Clock size={9} />{String(hour % 24).padStart(2, "0")}:00
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-border/15" />
                </div>
              ))}

              {sessions.map((session) => {
                const startDec = timeToDecimalHour(session.time);
                const endDec = timeToDecimalHour(session.endTime);
                const top = (startDec - dayStartHour) * PX_PER_HOUR;
                const height = Math.max(64, (endDec - startDec) * PX_PER_HOUR - 8);
                const isFull = session.enrolled >= session.capacity;
                const fillPercent = Math.round((session.enrolled / session.capacity) * 100);
                const meta = CLASS_META[session.class];

                return (
                  <div key={session.id} className="absolute left-16 right-0 pl-4" style={{ top: `${top}px`, height: `${height}px` }}>
                    <div className="group relative h-full glass rounded-xl border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_hsl(195_100%_50%/0.1)] overflow-hidden">
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${meta?.color ?? session.color}`} />
                      <div className={`absolute inset-0 bg-gradient-to-r ${meta?.color ?? session.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300`} />

                      <div className="h-full pl-4 pr-4 py-3 flex items-center gap-5 relative z-10">
                        <div className="flex items-center gap-3 min-w-[180px]">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta?.color ?? session.color} flex items-center justify-center text-xl shrink-0 opacity-90`}>
                            {meta?.icon ?? "🏋️"}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-sm group-hover:text-primary transition-colors duration-300 leading-tight truncate">
                              {session.class}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5 truncate">
                              {session.time}–{session.endTime} · {session.coach}
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 text-sm text-muted-foreground min-w-0">
                          <span className="flex items-center gap-1.5 text-xs">
                            <MapPin size={11} className="text-primary/60 shrink-0" />
                            <span className="truncate">{session.room}</span>
                          </span>
                        </div>

                        <div className="min-w-[140px] shrink-0">
                          <div className="flex items-center justify-between mb-1 text-[10px]">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Users size={10} />
                              {session.enrolled}/{session.capacity}
                            </span>
                            <span className={`font-black ${isFull ? "text-red-400" : fillPercent > 80 ? "text-yellow-400" : "text-green-400"}`}>
                              {isFull ? "PENUH" : fillPercent > 80 ? "HAMPIR PENUH" : "TERSEDIA"}
                            </span>
                          </div>
                          <div className="h-1.5 bg-muted/60 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 bg-gradient-to-r ${
                                isFull ? "from-red-500 to-red-600" : fillPercent > 80 ? "from-yellow-500 to-orange-500" : "from-primary to-accent"
                              }`}
                              style={{ width: `${fillPercent}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-3 min-w-[160px] justify-end shrink-0">
                          <div className="text-right">
                            <div className="text-[10px] text-muted-foreground">Per sesi</div>
                            <div className="font-black text-sm text-primary">Rp {session.price.toLocaleString("id-ID")}</div>
                          </div>
                          {isFull ? (
                            <Button variant="ghost" size="sm" disabled className="text-xs shrink-0 opacity-50">Penuh</Button>
                          ) : (
                            <Button variant="hero" size="sm" asChild className="shrink-0 text-xs">
                              <Link href={`/booking?day=${encodeURIComponent(activeDay)}&sessionId=${session.id}`} className="flex items-center gap-1">
                                Book <ChevronRight size={12} />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile: simplified stacked list (a positional timeline doesn't fit narrow screens) */}
            <div className="lg:hidden space-y-4">
              {sessions.map((session) => {
                const isFull = session.enrolled >= session.capacity;
                const fillPercent = Math.round((session.enrolled / session.capacity) * 100);
                const meta = CLASS_META[session.class];

                return (
                  <div key={session.id} className="group relative glass rounded-xl border border-border/20 overflow-hidden">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${meta?.color ?? session.color}`} />
                    <div className="pl-4 pr-4 py-4 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta?.color ?? session.color} flex items-center justify-center text-xl shrink-0 opacity-90`}>
                          {meta?.icon ?? "🏋️"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-base leading-tight">{session.class}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {session.time}–{session.endTime} · bersama {session.coach}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin size={11} className="text-primary/60" /> {session.room}
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1 text-[10px]">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Users size={10} /> {session.enrolled}/{session.capacity}
                          </span>
                          <span className={`font-black ${isFull ? "text-red-400" : fillPercent > 80 ? "text-yellow-400" : "text-green-400"}`}>
                            {isFull ? "PENUH" : fillPercent > 80 ? "HAMPIR PENUH" : "TERSEDIA"}
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted/60 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${
                              isFull ? "from-red-500 to-red-600" : fillPercent > 80 ? "from-yellow-500 to-orange-500" : "from-primary to-accent"
                            }`}
                            style={{ width: `${fillPercent}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <div className="font-black text-sm text-primary">Rp {session.price.toLocaleString("id-ID")}</div>
                        {isFull ? (
                          <Button variant="ghost" size="sm" disabled className="text-xs opacity-50">Penuh</Button>
                        ) : (
                          <Button variant="hero" size="sm" asChild className="text-xs">
                            <Link href={`/booking?day=${encodeURIComponent(activeDay)}&sessionId=${session.id}`} className="flex items-center gap-1">
                              Book <ChevronRight size={12} />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>

      {/* ── Booking policy note ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-24">
        <div className="glass rounded-2xl border border-border/20 p-5 text-sm text-muted-foreground flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[10px] font-black text-primary">i</span>
          </div>
          <div>
            <strong className="text-foreground">Kebijakan Booking:</strong> Kelas harus dibooking minimal 30 menit sebelum sesi dimulai.
            Pembatalan hingga 2 jam sebelum sesi mendapat refund penuh. No-show dapat dikenakan biaya.
            Member Premium dan Elite mendapat akses booking prioritas.
          </div>
        </div>
      </section>
    </div>
  );
}
