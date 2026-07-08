"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle, Calendar, ChevronRight, Zap, Users, Award, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ClassType } from "@/generated/prisma";

const LEVEL_LABELS: Record<string, string> = {
  ALL_LEVELS: "All Levels",
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

const LEVEL_COLORS: Record<string, string> = {
  ALL_LEVELS: "text-primary border-primary/40 bg-primary/10",
  BEGINNER: "text-green-400 border-green-400/40 bg-green-400/10",
  INTERMEDIATE: "text-yellow-400 border-yellow-400/40 bg-yellow-400/10",
  ADVANCED: "text-red-400 border-red-400/40 bg-red-400/10",
};

const FILTER_OPTIONS = ["All", "ALL_LEVELS", "BEGINNER", "INTERMEDIATE"];

const WHY_ITEMS = [
  { icon: Award, title: "Instruktur Bersertifikat", desc: "Coach kami memegang sertifikasi nasional & internasional dengan pengalaman kompetitif nyata.", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
  { icon: Users, title: "Semua Level Diterima", desc: "Setiap kelas punya modifikasi — mulai dari pemula hingga atlet profesional bisa ikut.", color: "text-green-400", bg: "bg-green-400/10 border-green-400/20" },
  { icon: Calendar, title: "Jadwal 7 Hari Seminggu", desc: "Dari pagi buta sampai malam — pilih waktu yang paling cocok dengan ritme hidupmu.", color: "text-primary", bg: "bg-primary/10 border-primary/20" },
  { icon: Zap, title: "Hasil dalam 30 Hari", desc: "Program berbasis sains yang terukur. Member rata-rata melihat perubahan nyata dalam satu bulan.", color: "text-accent", bg: "bg-accent/10 border-accent/20" },
];

export default function ClassesPageClient({ classTypes }: { classTypes: ClassType[] }) {
  const [filter, setFilter] = useState("All");
  const filtered = classTypes.filter((c) => filter === "All" || c.level === filter);

  return (
    <div className="min-h-screen pt-20 bg-[#0a0a0a]">

      {/* ── HERO ─────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent" />
        <div className="absolute inset-0 hologram-lines opacity-10" />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-xs font-bold tracking-widest uppercase text-primary mb-6">
              <Zap size={12} /> S-One Programs
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-[0.95] mb-6 tracking-tight">
              Temukan Kelas<br />
              <span className="gradient-text">yang Tepat Untukmu</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
              Enam program fitness yang dirancang oleh coach bersertifikat. Setiap kelas punya tujuan,
              metode, dan komunitas sendiri — pilih yang paling sesuai dengan tujuanmu.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link href="/schedule">
                  Lihat Jadwal Kelas <ArrowRight size={18} />
                </Link>
              </Button>
              <Button variant="neon" size="lg" asChild>
                <Link href="/membership">Mulai Free Trial</Link>
              </Button>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-border/20">
            {[
              { value: `${classTypes.length}`, label: "Program Kelas" },
              { value: "20+", label: "Coach Bersertifikat" },
              { value: "7", label: "Hari per Minggu" },
              { value: "2,000+", label: "Member Aktif" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black gradient-text">{s.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY OUR CLASSES ──────────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Left: sticky intro + stat callout */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-28">
                <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">Keunggulan Kami</span>
                <h2 className="text-3xl lg:text-4xl font-black mb-4">
                  Kenapa Pilih Kelas <span className="gradient-text">S-One?</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Bukan sekadar gym — kami membangun program yang dirancang untuk memberikan hasil nyata,
                  didukung coach bersertifikat dan komunitas yang saling mendukung.
                </p>
                <div className="inline-flex items-center gap-4 glass rounded-2xl border border-primary/20 px-6 py-5">
                  <div className="text-4xl font-black gradient-text">98%</div>
                  <div className="text-xs text-muted-foreground leading-tight max-w-32">
                    Member melaporkan hasil nyata dalam 30 hari pertama
                  </div>
                </div>
              </div>
            </div>

            {/* Right: numbered feature list with connecting line */}
            <div className="lg:col-span-3 relative">
              <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-border/30 to-transparent hidden sm:block" />
              <div className="space-y-4">
                {WHY_ITEMS.map(({ icon: Icon, title, desc, color, bg }, i) => (
                  <div
                    key={title}
                    className={`group relative flex items-start gap-5 sm:gap-6 glass rounded-2xl border p-6 hover:-translate-y-0.5 hover:border-primary/30 transition-all duration-300 ${bg}`}
                  >
                    <span className="hidden sm:block text-4xl font-black text-white/5 select-none absolute right-5 top-1/2 -translate-y-1/2 leading-none">
                      0{i + 1}
                    </span>
                    <div className={`relative z-10 shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${bg} border group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={22} className={color} />
                    </div>
                    <div className="relative z-10">
                      <h3 className="font-black text-base mb-1.5">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLASS LIST ───────────────────────────────────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        {/* Section header + filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-2 block">Pilih Kelasmu</span>
            <h2 className="text-3xl font-black">
              Semua <span className="gradient-text">Program</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
            <Filter size={14} className="text-muted-foreground shrink-0" />
            {FILTER_OPTIONS.map((opt) => {
              const sample = classTypes.find((c) => c.level === opt);
              return (
                <button
                  key={opt}
                  onClick={() => setFilter(opt)}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                    filter === opt
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_0_16px_hsl(195_100%_50%/0.4)]"
                      : "border-border/40 text-muted-foreground bg-card/50 hover:border-primary/60 hover:text-foreground hover:bg-primary/10"
                  }`}
                >
                  {opt !== "All" && <span>{sample?.icon}</span>}
                  {opt === "All" ? "Semua Kelas" : LEVEL_LABELS[opt]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Count */}
        <p className="text-xs text-muted-foreground mb-6">
          Menampilkan <span className="font-bold text-foreground">{filtered.length}</span> dari {classTypes.length} kelas
        </p>

        {/* Card grid — clean 3 col, NOT bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cls) => (
            <Link
              key={cls.id}
              href={`/classes/${cls.id}`}
              className="group block relative rounded-2xl overflow-hidden border border-white/10 hover:border-primary/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_40px_hsl(195_100%_50%/0.2)] cursor-pointer"
            >
              {/* Top gradient strip */}
              <div className={`h-1 w-full bg-gradient-to-r ${cls.color}`} />

              {/* Card body */}
              <div className="bg-card/80 p-6">
                {/* Header row: icon + badges */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${cls.color} flex items-center justify-center text-3xl shadow-lg`}>
                    {cls.icon}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${cls.color} opacity-30 blur-md -z-10`} />
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${LEVEL_COLORS[cls.level]} uppercase tracking-wide`}>
                      {LEVEL_LABELS[cls.level]}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground bg-secondary/60 px-2.5 py-1 rounded-full border border-border/30">
                      <Clock size={9} /> {cls.duration} min
                    </span>
                  </div>
                </div>

                {/* Name + description */}
                <h3 className="text-xl font-black mb-2 group-hover:text-primary transition-colors duration-300">
                  {cls.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">
                  {cls.description}
                </p>

                {/* Benefits preview */}
                {cls.benefits && (
                  <ul className="space-y-1.5 mb-6">
                    {cls.benefits.slice(0, 2).map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle size={12} className="text-primary shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA — always visible, high contrast */}
                <div className="flex items-center justify-between pt-4 border-t border-border/20">
                  <span className="text-xs text-muted-foreground">Klik untuk detail & jadwal</span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all duration-300">
                    Lihat Detail <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-accent/8 to-primary/5 border border-primary/25 p-10 lg:p-16 text-center">
          <div className="absolute inset-0 hologram-lines opacity-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block">Siap Mulai?</span>
            <h2 className="text-3xl lg:text-5xl font-black mb-4">
              Coba Kelas Pertamamu <span className="gradient-text">Gratis</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
              Daftar sekarang, coba satu minggu pertama tanpa biaya. Tidak ada kontrak, tidak ada risiko — hanya hasil nyata.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="text-base px-10" asChild>
                <Link href="/schedule">Booking Kelas Sekarang <ArrowRight size={18} /></Link>
              </Button>
              <Button variant="neon" size="lg" className="text-base px-10" asChild>
                <Link href="/membership">Lihat Paket Membership</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
