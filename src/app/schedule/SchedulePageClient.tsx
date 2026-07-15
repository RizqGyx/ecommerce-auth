"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, MapPin, Users, ChevronRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ClassType } from "@/generated/prisma";
import type { toScheduleSession } from "@/lib/serializers";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAY_SHORT: Record<string, string> = {
  Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed", Thursday: "Thu",
  Friday: "Fri", Saturday: "Sat", Sunday: "Sun",
};

type ScheduleSession = ReturnType<typeof toScheduleSession>;

// Extract hours to bucket sessions for timeline
function toHour(time: string): number {
  return parseInt(time.split(":")[0], 10);
}

export default function SchedulePageClient({
  classTypes,
  scheduleByDay,
  dayDates,
}: {
  classTypes: ClassType[];
  scheduleByDay: Record<string, ScheduleSession[]>;
  dayDates: Record<string, string>;
}) {
  const CLASS_FILTER_OPTIONS = ["All Classes", ...classTypes.map((c) => c.name)];

  // Build color + icon lookup from classTypes
  const CLASS_META: Record<string, { color: string; icon: string }> = {};
  classTypes.forEach((c) => {
    CLASS_META[c.name] = { color: c.color ?? "from-primary to-accent", icon: c.icon ?? "🏋️" };
  });

  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const [activeDay, setActiveDay] = useState<string>(DAYS.includes(todayName) ? todayName : "Monday");
  const [classFilter, setClassFilter] = useState("All Classes");

  const allSessions = scheduleByDay[activeDay] ?? [];
  const sessions = allSessions.filter(
    (s) => classFilter === "All Classes" || s.class === classFilter
  );

  // Time range for timeline
  const hours = sessions.length > 0
    ? Array.from(
        { length: toHour(sessions[sessions.length - 1].endTime) - toHour(sessions[0].time) + 1 },
        (_, i) => toHour(sessions[0].time) + i
      )
    : [];

  return (
    <div className="min-h-screen pt-20 bg-[#0a0a0a]">
      {/* ── Compact Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-12 lg:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/8 via-primary/4 to-transparent" />
        <div className="absolute inset-0 hologram-lines opacity-10" />
        <div className="absolute top-0 right-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-1/3 w-60 h-60 bg-accent/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-xs font-bold tracking-widest uppercase text-accent mb-4">
                <CalendarDays size={11} />
                Weekly Schedule
              </div>
              <h1 className="text-4xl lg:text-6xl font-black leading-none mb-3 tracking-tight">
                Class <span className="gradient-text">Schedule</span>
              </h1>
              <p className="text-muted-foreground">
                Book your spot — sessions fill fast. Secure your place ahead of time.
              </p>
            </div>

            {/* Today stats */}
            <div className="flex items-center gap-4 glass rounded-2xl px-6 py-4 border border-border/20 shrink-0">
              <div className="text-center">
                <div className="text-2xl font-black gradient-text">{allSessions.length}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Classes today</div>
              </div>
              <div className="w-px h-10 bg-border/40" />
              <div className="text-center">
                <div className="text-2xl font-black text-foreground">
                  {allSessions.reduce((acc, s) => acc + (s.capacity - s.enrolled), 0)}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Spots open</div>
              </div>
              <div className="w-px h-10 bg-border/40" />
              <div className="text-center">
                <div className="text-xs font-bold text-primary uppercase tracking-wide">Jun–Jul</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Week 27</div>
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
            <p className="text-muted-foreground text-lg font-medium">No classes match your filter.</p>
            <p className="text-muted-foreground/60 text-sm mt-1">Try a different day or class type.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Left time rail + session blocks */}
            <div className="flex gap-0">
              {/* Time labels column */}
              <div className="flex flex-col shrink-0 w-16 lg:w-20 pt-2 select-none">
                {sessions.map((session, i) => (
                  <div
                    key={`time-${session.id}`}
                    className={`flex items-start justify-end pr-3 lg:pr-4 ${i < sessions.length - 1 ? "mb-4" : ""}`}
                    style={{ minHeight: "96px" }}
                  >
                    <div className="text-right">
                      <div className="text-sm font-black text-foreground/70 tabular-nums">{session.time}</div>
                      <div className="text-[10px] text-muted-foreground/50 tabular-nums">–{session.endTime}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Vertical dotted line */}
              <div className="relative shrink-0 flex flex-col items-center pt-2">
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-primary/40 via-border/30 to-transparent" />
                {sessions.map((session, i) => {
                  const meta = CLASS_META[session.class];
                  return (
                    <div
                      key={`dot-${session.id}`}
                      className={`relative z-10 flex items-start ${i < sessions.length - 1 ? "mb-4" : ""}`}
                      style={{ minHeight: "96px" }}
                    >
                      <div
                        className={`w-3 h-3 mt-2 rounded-full bg-gradient-to-br ${meta?.color ?? session.color} shadow-[0_0_8px_currentColor] shrink-0`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Session cards column */}
              <div className="flex-1 flex flex-col gap-4 pl-4">
                {sessions.map((session) => {
                  const isFull = session.enrolled >= session.capacity;
                  const fillPercent = Math.round((session.enrolled / session.capacity) * 100);
                  const meta = CLASS_META[session.class];

                  return (
                    <div
                      key={session.id}
                      className="group relative glass rounded-xl border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_hsl(195_100%_50%/0.1)] overflow-hidden"
                      style={{ minHeight: "88px" }}
                    >
                      {/* Gradient left border accent */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${meta?.color ?? session.color}`} />

                      {/* Subtle class color glow on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${meta?.color ?? session.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300`} />

                      <div className="pl-4 pr-4 py-4 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5 relative z-10">
                        {/* Icon + name */}
                        <div className="flex items-center gap-3 lg:min-w-[180px]">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta?.color ?? session.color} flex items-center justify-center text-xl shrink-0 opacity-90`}>
                            {meta?.icon ?? "🏋️"}
                          </div>
                          <div>
                            <div className="font-bold text-base group-hover:text-primary transition-colors duration-300 leading-tight">
                              {session.class}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">with {session.coach}</div>
                          </div>
                        </div>

                        {/* Location + Level */}
                        <div className="flex items-center gap-4 lg:flex-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5 text-xs">
                            <MapPin size={11} className="text-primary/60" />
                            {session.room}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              session.level === "All Levels"
                                ? "text-primary border-primary/30 bg-primary/10"
                                : "text-accent border-accent/30 bg-accent/10"
                            }`}
                          >
                            {session.level}
                          </span>
                        </div>

                        {/* Capacity bar */}
                        <div className="lg:min-w-[140px]">
                          <div className="flex items-center justify-between mb-1 text-[10px]">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Users size={10} />
                              {session.enrolled}/{session.capacity}
                            </span>
                            <span
                              className={`font-black ${
                                isFull ? "text-red-400" : fillPercent > 80 ? "text-yellow-400" : "text-green-400"
                              }`}
                            >
                              {isFull ? "FULL" : fillPercent > 80 ? "ALMOST" : "OPEN"}
                            </span>
                          </div>
                          <div className="h-1.5 bg-muted/60 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 bg-gradient-to-r ${
                                isFull
                                  ? "from-red-500 to-red-600"
                                  : fillPercent > 80
                                  ? "from-yellow-500 to-orange-500"
                                  : "from-primary to-accent"
                              }`}
                              style={{ width: `${fillPercent}%` }}
                            />
                          </div>
                        </div>

                        {/* Price + Book */}
                        <div className="flex items-center gap-3 lg:min-w-[160px] lg:justify-end shrink-0">
                          <div className="text-right">
                            <div className="text-[10px] text-muted-foreground">Per session</div>
                            <div className="font-black text-sm text-primary">
                              Rp {session.price.toLocaleString("id-ID")}
                            </div>
                          </div>
                          {isFull ? (
                            <Button variant="ghost" size="sm" disabled className="text-xs shrink-0 opacity-50">
                              Full
                            </Button>
                          ) : (
                            <Button variant="hero" size="sm" asChild className="shrink-0 text-xs">
                              <Link
                                href={`/booking?day=${encodeURIComponent(activeDay)}&sessionId=${session.id}`}
                                className="flex items-center gap-1"
                              >
                                Book
                                <ChevronRight size={12} />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── Booking policy note ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-24">
        <div className="glass rounded-2xl border border-border/20 p-5 text-sm text-muted-foreground flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[10px] font-black text-primary">i</span>
          </div>
          <div>
            <strong className="text-foreground">Booking Policy:</strong> Classes must be booked at least 30 minutes in advance.
            Cancel up to 2 hours before the session for a full refund. No-shows may be charged.
            Premium and Elite members get priority booking access.
          </div>
        </div>
      </section>
    </div>
  );
}
