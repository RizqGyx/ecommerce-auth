import Link from "next/link";
import Image from "next/image";
import {
  Target,
  TrendingUp,
  Calendar,
  Award,
  CheckCircle,
  ArrowRight,
  Zap,
  Users,
  Star,
  Instagram,
  ChevronRight,
  ClipboardList,
  Dumbbell,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import Reveal from "@/components/atoms/Reveal";
import MagneticButton from "@/components/atoms/motion/MagneticButton";

export const metadata = buildMetadata({
  title: "Personal Training",
  description:
    "Latihan 1-on-1 dengan personal trainer bersertifikat di S-One Gym Bukittinggi. Program custom sesuai tujuanmu — dari fat loss sampai muscle gain.",
  path: "/personal-trainer",
});

const PT_BENEFITS = [
  {
    icon: Target,
    title: "Program Sesuai Tujuan",
    description:
      "Programmu dirancang sesuai tujuan spesifikmu — penurunan lemak, penambahan massa otot, performa atletik, atau rehabilitasi.",
  },
  {
    icon: TrendingUp,
    title: "Progres Terukur",
    description:
      "Asesmen rutin, pelacakan komposisi tubuh, dan tolok ukur performa memastikan kamu bisa melihat sejauh mana kemajuanmu.",
  },
  {
    icon: Calendar,
    title: "Jadwal Fleksibel",
    description:
      "Sesi dijadwalkan sesuai hidupmu, bukan sebaliknya. Pagi, malam, akhir pekan — kapan pun yang cocok untukmu.",
  },
  {
    icon: Award,
    title: "Akuntabilitas dari Ahlinya",
    description:
      "PT-mu memantau di antara sesi, menyesuaikan nutrisimu, dan menjagamu tetap on track saat motivasi menurun.",
  },
];

const PT_PACKAGES = [
  {
    name: "Starter",
    sessions: 4,
    price: 700000,
    validDays: 30,
    features: [
      "4 x sesi PT 60 menit",
      "Asesmen kebugaran awal",
      "Panduan nutrisi dasar",
      "Program latihan kustom",
    ],
  },
  {
    name: "Transform",
    sessions: 8,
    price: 1300000,
    validDays: 30,
    popular: true,
    features: [
      "8 x sesi PT 60 menit",
      "Asesmen kebugaran lengkap",
      "Rencana nutrisi personal",
      "Program latihan kustom",
      "Dukungan WhatsApp",
      "Laporan progres bulanan",
    ],
  },
  {
    name: "Elite",
    sessions: 16,
    price: 2400000,
    validDays: 60,
    features: [
      "16 x sesi PT 60 menit",
      "Analisis komposisi tubuh lengkap",
      "Coaching nutrisi lanjutan",
      "Program periodisasi 8 minggu",
      "Dukungan WhatsApp harian",
      "Laporan progres dua mingguan",
      "Panduan suplemen",
    ],
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    icon: Users,
    title: "Pilih Trainer",
    desc: "Jelajahi PT bersertifikat kami dan temukan yang paling cocok dengan kepribadian dan tujuanmu.",
  },
  {
    step: "02",
    icon: MessageSquare,
    title: "Konsultasi Awal",
    desc: "Panggilan gratis 30 menit untuk membahas tujuan, riwayat, dan ekspektasimu.",
  },
  {
    step: "03",
    icon: ClipboardList,
    title: "Desain Program",
    desc: "PT-mu menyusun program 4–8 minggu yang sepenuhnya disesuaikan khusus untukmu.",
  },
  {
    step: "04",
    icon: Dumbbell,
    title: "Mulai Latihan",
    desc: "Datang, dan kerjakan. PT-mu membimbing setiap repetisi dan setiap keputusan.",
  },
];

const INITIALS_GRADIENTS = [
  "from-blue-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-purple-500 to-pink-600",
  "from-teal-500 to-cyan-600",
  "from-indigo-500 to-purple-600",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default async function PersonalTrainerPage() {
  const pts = await prisma.coach.findMany({
    where: { isPersonalTrainer: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* ═══════════════════════════════════════════════
          HERO — split layout
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#080810] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="hologram-lines absolute inset-0 opacity-15" />
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-primary/8 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/8 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16">
          {/* LEFT: Text */}
          <div>
            <div className="inline-flex items-center gap-2 glass border border-primary/20 text-primary text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
              <Zap size={12} />
              Personal Training
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-[0.92] tracking-tight mb-6">
              Trainer-mu,
              <br />
              <span className="gradient-text">Hasilmu</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg">
              Berhenti menebak-nebak. Mulai progres nyata. Personal trainer
              bersertifikat kami merancang program yang dibuat khusus untuk
              tubuh, tujuan, dan hidupmu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="hero"
                size="lg"
                className="text-base px-10 py-6 h-auto"
                asChild
              >
                <Link href="#trainers">
                  Kenali Trainer Kami <ArrowRight size={18} />
                </Link>
              </Button>
              <Button
                variant="neon"
                size="lg"
                className="text-base px-10 py-6 h-auto"
                asChild
              >
                <Link href="#packages">Lihat Paket</Link>
              </Button>
            </div>

            {/* Floating stat badges */}
            <div className="flex flex-wrap gap-3 mt-10">
              {[
                { icon: Star, label: "4.9★ Rating" },
                { icon: Users, label: "50+ Klien" },
                { icon: Award, label: "Trainer Bersertifikat" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="glass border border-border/30 rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-semibold text-foreground/80"
                >
                  <Icon size={14} className="text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: 3 stacked trainer preview cards */}
          <div className="relative hidden lg:flex flex-col gap-4">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl blur-2xl" />
            {pts.slice(0, 3).map((pt, i) => (
              <div
                key={pt.id}
                className="relative glass rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300 p-5 flex items-center gap-5"
                style={{
                  transform: `translateX(${i % 2 === 0 ? "0" : "2rem"})`,
                  zIndex: 3 - i,
                }}
              >
                {/* Avatar circle */}
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                  {pt.imageUrl ? (
                    <Image src={pt.imageUrl} alt={pt.name} fill sizes="56px" className="object-cover" />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${
                        INITIALS_GRADIENTS[i % INITIALS_GRADIENTS.length]
                      } flex items-center justify-center`}
                    >
                      <span className="text-xl font-black text-white/90 select-none">
                        {getInitials(pt.name)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm leading-tight">{pt.name}</div>
                  <div className="text-xs text-primary mb-2">{pt.title}</div>
                  <div className="flex flex-wrap gap-1">
                    {pt.specialties.slice(0, 2).map((s) => (
                      <span
                        key={s}
                        className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                {pt.pricePerSession && (
                  <div className="ml-auto shrink-0 text-right">
                    <div className="text-xs text-muted-foreground">mulai</div>
                    <div className="text-sm font-black gradient-text">
                      Rp {(pt.pricePerSession / 1000).toFixed(0)}k
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WHY PT WORKS — asymmetric layout
      ═══════════════════════════════════════════════ */}
      <Reveal><section className="max-w-7xl mx-auto px-6 py-24">
        {/* Section label */}
        <div className="mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            Perbedaannya
          </p>
          <h2 className="text-4xl lg:text-5xl font-black leading-tight">
            Kenapa Personal Training{" "}
            <span className="gradient-text">Efektif</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg leading-relaxed">
            Program generik menghasilkan hasil generik. Personal training
            memberikan hasil yang bertahan lama.
          </p>
        </div>

        {/* Asymmetric grid: large + 2 stacked + wide banner */}
        {(() => {
          const B0Icon = PT_BENEFITS[0].icon;
          const B1Icon = PT_BENEFITS[1].icon;
          const B2Icon = PT_BENEFITS[2].icon;
          const B3Icon = PT_BENEFITS[3].icon;
          return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Card 1 — LARGE (spans 2 rows) */}
          <div className="lg:row-span-2 glass rounded-3xl border border-border/20 hover:border-primary/30 transition-all duration-300 p-8 flex flex-col relative overflow-hidden group hover:shadow-xl hover:shadow-primary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <B0Icon size={28} className="text-primary" />
              </div>
              <h3 className="text-2xl font-black mb-4">{PT_BENEFITS[0].title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-8">
                {PT_BENEFITS[0].description}
              </p>
              {/* Decorative tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {["Fat Loss", "Muscle Gain", "Performa", "Rehab"].map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 — medium (right top) */}
          <div className="lg:col-span-2 glass rounded-3xl border border-border/20 hover:border-accent/30 transition-all duration-300 p-7 relative overflow-hidden group hover:shadow-xl hover:shadow-accent/10">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                <B1Icon size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-black mb-3">{PT_BENEFITS[1].title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {PT_BENEFITS[1].description}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 — medium (right bottom) */}
          <div className="lg:col-span-2 glass rounded-3xl border border-border/20 hover:border-primary/30 transition-all duration-300 p-7 relative overflow-hidden group hover:shadow-xl hover:shadow-primary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <B2Icon size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-black mb-3">{PT_BENEFITS[2].title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {PT_BENEFITS[2].description}
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 — WIDE BANNER (full width) */}
          <div className="lg:col-span-3 relative overflow-hidden rounded-3xl border border-border/20 hover:border-accent/40 transition-all duration-300 group hover:shadow-2xl hover:shadow-accent/10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0820] via-[#0f0a1a] to-[#0a0d1a]" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            <div className="relative z-10 p-7 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0 group-hover:bg-accent/25 transition-colors">
                <B3Icon size={28} className="text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black mb-2">{PT_BENEFITS[3].title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm max-w-2xl">
                  {PT_BENEFITS[3].description}
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-4 shrink-0">
                {["Check-in", "Penyesuaian Nutrisi", "Motivasi"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle size={12} className="text-accent" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
          );
        })()}
      </section></Reveal>

      {/* ═══════════════════════════════════════════════
          HOW IT WORKS — large numbered cards + connecting line
      ═══════════════════════════════════════════════ */}
      <Reveal><section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/15 to-transparent" />
        <div className="hologram-lines absolute inset-0 opacity-[0.07]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
              Proses sederhana
            </p>
            <h2 className="text-4xl lg:text-5xl font-black">
              Cara <span className="gradient-text">Kerjanya</span>
            </h2>
          </div>

          {/* Steps grid with connector line */}
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Connecting gradient line on desktop */}
            <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px">
              <div className="w-full h-full bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40" />
            </div>

            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative flex flex-col items-center text-center group">
                  {/* Step number + icon circle */}
                  <div className="relative mb-6">
                    {/* Outer ring */}
                    <div className="w-32 h-32 rounded-3xl glass border border-primary/20 group-hover:border-primary/50 transition-all duration-300 flex flex-col items-center justify-center gap-1 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-primary/15">
                      <span className="text-xs font-black gradient-text tracking-widest">
                        {step.step}
                      </span>
                      <Icon size={28} className="text-primary/70 group-hover:text-primary transition-colors" />
                    </div>
                    {/* Glow dot */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/60 shadow-lg shadow-primary/40" />
                  </div>

                  <h3 className="font-black text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-48">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section></Reveal>

      {/* ═══════════════════════════════════════════════
          OUR PERSONAL TRAINERS — inline custom cards
      ═══════════════════════════════════════════════ */}
      <Reveal><section id="trainers" className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            Coach ahli
          </p>
          <h2 className="text-4xl lg:text-5xl font-black">
            Personal Trainer <span className="gradient-text">Kami</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg leading-relaxed">
            Setiap PT kami memegang sertifikasi profesional dan rekam jejak
            hasil klien yang terbukti.
          </p>
        </div>

        {/* Editorial alternating spread — each trainer is a full profile moment, not a card in a grid */}
        <div className="space-y-6">
          {pts.map((pt, i) => {
            const isReversed = i % 2 === 1;
            return (
              <Reveal key={pt.id} index={i} staggerMs={80}>
                <div
                  className={`group flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} rounded-3xl overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_60px_hsl(195_100%_50%/0.12)]`}
                >
                  {/* Photo panel */}
                  <div className="relative md:w-2/5 min-h-64 md:min-h-80 overflow-hidden shrink-0">
                    {pt.imageUrl ? (
                      <Image
                        src={pt.imageUrl}
                        alt={pt.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${INITIALS_GRADIENTS[i % INITIALS_GRADIENTS.length]} flex items-center justify-center`}>
                        <span className="text-8xl font-black text-white/20 select-none">{getInitials(pt.name)}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent md:bg-gradient-to-r md:from-black/10 md:via-transparent md:to-transparent" />
                    <span className="absolute bottom-3 right-4 text-7xl font-black text-white/10 select-none leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content panel */}
                  <div className="flex-1 bg-card/60 p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="glass border border-yellow-500/20 rounded-lg px-3 py-1.5 flex items-center gap-2">
                        <Award size={12} className="text-yellow-400" />
                        <span className="text-xs font-semibold text-yellow-300">
                          {pt.experience} tahun pengalaman
                        </span>
                      </div>
                      {pt.pricePerSession && (
                        <div className="glass border border-primary/20 rounded-lg px-3 py-1.5">
                          <span className="text-xs text-muted-foreground">mulai </span>
                          <span className="text-xs font-black text-primary">
                            Rp {pt.pricePerSession.toLocaleString("id-ID")}
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-3xl md:text-4xl font-black mb-1 group-hover:text-primary transition-colors duration-300">
                      {pt.name}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-4">{pt.title}</p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {pt.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 max-w-lg">
                      {pt.certifications.slice(0, 4).map((cert) => (
                        <li key={cert} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle size={13} className="text-primary shrink-0" />
                          {cert}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap items-center gap-4">
                      <MagneticButton>
                        <Button variant="hero" asChild>
                          <Link href={`/personal-trainer/book?trainer=${pt.id}`}>
                            Book Sesi <ArrowRight size={16} />
                          </Link>
                        </Button>
                      </MagneticButton>
                      {pt.instagram && (
                        <a
                          href={`https://instagram.com/${pt.instagram.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-pink-400 transition-colors"
                        >
                          <Instagram size={12} />
                          {pt.instagram}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section></Reveal>

      {/* ═══════════════════════════════════════════════
          PACKAGES — asymmetric with Transform as hero
      ═══════════════════════════════════════════════ */}
      <Reveal><section id="packages" className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
              Pilih paketmu
            </p>
            <h2 className="text-4xl lg:text-5xl font-black">
              Paket <span className="gradient-text">PT</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-sm mx-auto text-sm">
              Semua paket sudah termasuk konsultasi awal gratis.
            </p>
          </div>

          {/* 3-col layout: compact · GIANT · compact */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.45fr_1fr] gap-5 lg:gap-6 items-end">
            {PT_PACKAGES.map((pkg) => {
              const pricePerSession = Math.round(pkg.price / pkg.sessions);

              if (pkg.popular) {
                /* ── TRANSFORM (middle — hero card) ── */
                return (
                  <div
                    key={pkg.name}
                    className="relative rounded-3xl overflow-hidden border border-primary/50 shadow-2xl shadow-primary/25 md:-translate-y-6"
                  >
                    {/* Full gradient header */}
                    <div className="relative bg-gradient-to-br from-primary via-blue-500 to-accent p-8 overflow-hidden">
                      <div className="absolute inset-0 hologram-lines opacity-20" />
                      <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-white/90 text-xs font-black uppercase tracking-widest">
                            {pkg.name}
                          </span>
                          <span className="bg-white/20 backdrop-blur text-white text-[10px] font-black px-3 py-1 rounded-full">
                            ✦ PALING POPULER
                          </span>
                        </div>
                        {/* Huge price */}
                        <div className="mt-2">
                          <div className="text-[3rem] lg:text-[3.5rem] font-black text-white leading-none">
                            Rp {pkg.price.toLocaleString("id-ID")}
                          </div>
                          <div className="text-white/70 text-sm mt-1">
                            Rp {pricePerSession.toLocaleString("id-ID")} per sesi
                          </div>
                        </div>
                        <div className="mt-3 text-white/60 text-xs">
                          {pkg.sessions} sesi · berlaku {pkg.validDays} hari
                        </div>
                      </div>
                    </div>

                    {/* Features body */}
                    <div className="glass p-8">
                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((f) => (
                          <li key={f} className="flex items-center gap-3 text-sm">
                            <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                              <CheckCircle size={11} className="text-primary" />
                            </div>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Button variant="hero" size="lg" className="w-full h-12 text-base" asChild>
                        <Link href={`/personal-trainer/book?package=${pkg.name}`}>
                          Ambil Transform <ArrowRight size={18} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              }

              /* ── STARTER & ELITE (side cards) ── */
              return (
                <div
                  key={pkg.name}
                  className="relative glass rounded-2xl overflow-hidden border border-border/20 hover:border-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
                >
                  <div className="p-6 lg:p-7">
                    <div className="mb-5">
                      <h3 className="text-lg font-black mb-0.5">{pkg.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {pkg.sessions} sesi · berlaku {pkg.validDays} hari
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-6 pb-6 border-b border-border/20">
                      <div className="text-3xl font-black gradient-text">
                        Rp {pkg.price.toLocaleString("id-ID")}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Rp {pricePerSession.toLocaleString("id-ID")} per sesi
                      </div>
                    </div>

                    <ul className="space-y-2.5 mb-6">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle size={12} className="text-primary/60 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Button variant="neon" className="w-full" asChild>
                      <Link href={`/personal-trainer/book?package=${pkg.name}`}>
                        Book {pkg.name} <ChevronRight size={16} />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fine print */}
          <p className="text-center text-xs text-muted-foreground mt-8">
            Semua harga dalam Rupiah. Konsultasi gratis 30 menit sudah termasuk di setiap paket.
            <Link href="/contact" className="text-primary ml-1 hover:underline">
              Ada pertanyaan? Hubungi kami.
            </Link>
          </p>
        </div>
      </section></Reveal>

      {/* ═══════════════════════════════════════════════
          BOTTOM CTA
      ═══════════════════════════════════════════════ */}
      <Reveal><section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-[#0d0820] to-accent/10" />
        <div className="absolute inset-0 hologram-lines opacity-10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 glass border border-primary/20 text-primary text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
            <Zap size={12} />
            Mulai Hari Ini
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-4">
            Siap Bertransformasi?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Book konsultasi gratis 30 menit dengan trainer manapun — tanpa
            komitmen, tanpa tekanan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-base px-10 py-6 h-auto" asChild>
              <Link href="#trainers">
                Pilih Trainer <ArrowRight size={18} />
              </Link>
            </Button>
            <Button variant="glass" size="lg" className="text-base px-10 py-6 h-auto" asChild>
              <Link href="/coaches">
                Lihat Semua Coach
              </Link>
            </Button>
          </div>
        </div>
      </section></Reveal>
    </div>
  );
}
