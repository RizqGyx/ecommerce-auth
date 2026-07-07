import Link from "next/link";
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

const PT_BENEFITS = [
  {
    icon: Target,
    title: "Goal-Specific Programming",
    description:
      "Your program is built around your exact goals — fat loss, muscle gain, athletic performance, or rehabilitation.",
  },
  {
    icon: TrendingUp,
    title: "Measurable Progress",
    description:
      "Regular assessments, body composition tracking, and performance benchmarks ensure you can see how far you've come.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description:
      "Sessions booked around your life, not ours. Morning, evening, weekend — whatever works for you.",
  },
  {
    icon: Award,
    title: "Expert Accountability",
    description:
      "Your PT checks in between sessions, adjusts your nutrition, and keeps you on track when motivation dips.",
  },
];

const PT_PACKAGES = [
  {
    name: "Starter",
    sessions: 4,
    price: 700000,
    validDays: 30,
    features: [
      "4 x 60-min PT sessions",
      "Initial fitness assessment",
      "Basic nutrition guidelines",
      "Custom workout plan",
    ],
  },
  {
    name: "Transform",
    sessions: 8,
    price: 1300000,
    validDays: 30,
    popular: true,
    features: [
      "8 x 60-min PT sessions",
      "Full fitness assessment",
      "Personalized nutrition plan",
      "Custom workout program",
      "WhatsApp support",
      "Monthly progress report",
    ],
  },
  {
    name: "Elite",
    sessions: 16,
    price: 2400000,
    validDays: 60,
    features: [
      "16 x 60-min PT sessions",
      "Complete body composition analysis",
      "Advanced nutrition coaching",
      "Periodized 8-week program",
      "Daily WhatsApp support",
      "Bi-weekly progress reports",
      "Supplement guidance",
    ],
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    icon: Users,
    title: "Choose a Trainer",
    desc: "Browse our certified PTs and find the right fit for your personality and goals.",
  },
  {
    step: "02",
    icon: MessageSquare,
    title: "Initial Consultation",
    desc: "Free 30-minute call to discuss your goals, history, and expectations.",
  },
  {
    step: "03",
    icon: ClipboardList,
    title: "Program Design",
    desc: "Your PT builds a fully customized 4–8 week program just for you.",
  },
  {
    step: "04",
    icon: Dumbbell,
    title: "Start Training",
    desc: "Show up, put in the work. Your PT guides every rep and every decision.",
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
  const [B0Icon, B1Icon, B2Icon, B3Icon] = PT_BENEFITS.map((b) => b.icon);

  return (
    <div className="min-h-screen bg-background">
      {/* ═══════════════════════════════════════════════
          HERO — split layout
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#080810] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="hologram-lines absolute inset-0 opacity-15" />
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-radial from-primary/8 via-transparent to-transparent rounded-full blur-3xl -translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-accent/8 via-transparent to-transparent rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16">
          {/* LEFT: Text */}
          <div>
            <div className="inline-flex items-center gap-2 glass border border-primary/20 text-primary text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
              <Zap size={12} />
              Personal Training
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-[0.92] tracking-tight mb-6">
              Your Trainer,
              <br />
              <span className="gradient-text">Your Results</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg">
              Stop guessing. Start progressing. Our certified personal trainers
              design programs built specifically around your body, goals, and
              life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="hero"
                size="lg"
                className="text-base px-10 py-6 h-auto"
                asChild
              >
                <Link href="#trainers">
                  Meet Our Trainers <ArrowRight size={18} />
                </Link>
              </Button>
              <Button
                variant="neon"
                size="lg"
                className="text-base px-10 py-6 h-auto"
                asChild
              >
                <Link href="#packages">View Packages</Link>
              </Button>
            </div>

            {/* Floating stat badges */}
            <div className="flex flex-wrap gap-3 mt-10">
              {[
                { icon: Star, label: "4.9★ Rating" },
                { icon: Users, label: "50+ Clients" },
                { icon: Award, label: "Certified Trainers" },
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
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                    INITIALS_GRADIENTS[i % INITIALS_GRADIENTS.length]
                  } flex items-center justify-center shrink-0`}
                >
                  <span className="text-xl font-black text-white/90 select-none">
                    {getInitials(pt.name)}
                  </span>
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
                    <div className="text-xs text-muted-foreground">from</div>
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
      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* Section label */}
        <div className="mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            The difference
          </p>
          <h2 className="text-4xl lg:text-5xl font-black leading-tight">
            Why Personal Training{" "}
            <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg leading-relaxed">
            Generic programs produce generic results. Personal training delivers
            outcomes that last.
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
                {["Fat Loss", "Muscle Gain", "Performance", "Rehab"].map((t) => (
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
                {["Check-ins", "Nutrition Tweaks", "Motivation"].map((t) => (
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
      </section>

      {/* ═══════════════════════════════════════════════
          HOW IT WORKS — large numbered cards + connecting line
      ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/15 to-transparent" />
        <div className="hologram-lines absolute inset-0 opacity-[0.07]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
              Simple process
            </p>
            <h2 className="text-4xl lg:text-5xl font-black">
              How It <span className="gradient-text">Works</span>
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
      </section>

      {/* ═══════════════════════════════════════════════
          OUR PERSONAL TRAINERS — inline custom cards
      ═══════════════════════════════════════════════ */}
      <section id="trainers" className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            Expert coaches
          </p>
          <h2 className="text-4xl lg:text-5xl font-black">
            Our <span className="gradient-text">Personal Trainers</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg leading-relaxed">
            Every one of our PTs holds professional certifications and a proven
            track record of client results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pts.map((pt, i) => (
            <div
              key={pt.id}
              className="group relative glass rounded-2xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
            >
              {/* Top gradient band */}
              <div
                className={`h-2 w-full bg-gradient-to-r ${
                  i % 2 === 0
                    ? "from-primary/80 to-accent/80"
                    : "from-accent/80 to-primary/80"
                }`}
              />

              <div className="p-6">
                {/* Avatar + name row */}
                <div className="flex items-center gap-4 mb-6">
                  {/* Large monogram circle */}
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${
                      INITIALS_GRADIENTS[i % INITIALS_GRADIENTS.length]
                    } flex items-center justify-center shrink-0 shadow-lg`}
                  >
                    <span className="text-3xl font-black text-white/90 select-none">
                      {getInitials(pt.name)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black leading-tight group-hover:text-primary transition-colors">
                      {pt.name}
                    </h3>
                    <p className="text-primary text-sm font-medium">{pt.title}</p>
                    {pt.instagram && (
                      <a
                        href={`https://instagram.com/${pt.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-pink-400 transition-colors mt-1"
                      >
                        <Instagram size={10} />
                        {pt.instagram}
                      </a>
                    )}
                  </div>
                </div>

                {/* Experience badge */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="glass border border-yellow-500/20 rounded-lg px-3 py-1.5 flex items-center gap-2">
                    <Award size={12} className="text-yellow-400" />
                    <span className="text-xs font-semibold text-yellow-300">
                      {pt.experience} years experience
                    </span>
                  </div>
                  {pt.pricePerSession && (
                    <div className="glass border border-primary/20 rounded-lg px-3 py-1.5">
                      <span className="text-xs text-muted-foreground">from </span>
                      <span className="text-xs font-black text-primary">
                        Rp {pt.pricePerSession.toLocaleString("id-ID")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Specialties chips */}
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

                {/* Certifications */}
                <div className="mb-5 pb-5 border-b border-border/20">
                  {pt.certifications.slice(0, 2).map((cert) => (
                    <div
                      key={cert}
                      className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5"
                    >
                      <CheckCircle size={11} className="text-primary/60 shrink-0" />
                      {cert}
                    </div>
                  ))}
                </div>

                {/* Book CTA */}
                <Button variant="hero" className="w-full" asChild>
                  <Link href={`/personal-trainer/book?trainer=${pt.id}`}>
                    Book a Session <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PACKAGES — asymmetric with Transform as hero
      ═══════════════════════════════════════════════ */}
      <section id="packages" className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
              Choose your plan
            </p>
            <h2 className="text-4xl lg:text-5xl font-black">
              PT <span className="gradient-text">Packages</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-sm mx-auto text-sm">
              All packages include a free initial consultation.
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
                            ✦ MOST POPULAR
                          </span>
                        </div>
                        {/* Huge price */}
                        <div className="mt-2">
                          <div className="text-[3rem] lg:text-[3.5rem] font-black text-white leading-none">
                            Rp {pkg.price.toLocaleString("id-ID")}
                          </div>
                          <div className="text-white/70 text-sm mt-1">
                            Rp {pricePerSession.toLocaleString("id-ID")} per session
                          </div>
                        </div>
                        <div className="mt-3 text-white/60 text-xs">
                          {pkg.sessions} sessions · valid {pkg.validDays} days
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
                          Get Transform <ArrowRight size={18} />
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
                        {pkg.sessions} sessions · valid {pkg.validDays} days
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-6 pb-6 border-b border-border/20">
                      <div className="text-3xl font-black gradient-text">
                        Rp {pkg.price.toLocaleString("id-ID")}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Rp {pricePerSession.toLocaleString("id-ID")} per session
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
            All prices in IDR. Free 30-minute consultation included with every package.
            <Link href="/contact" className="text-primary ml-1 hover:underline">
              Questions? Contact us.
            </Link>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BOTTOM CTA
      ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-[#0d0820] to-accent/10" />
        <div className="absolute inset-0 hologram-lines opacity-10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 glass border border-primary/20 text-primary text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
            <Zap size={12} />
            Start Today
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-4">
            Ready to Transform?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Book a free 30-minute consultation with any of our trainers — no
            commitment, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-base px-10 py-6 h-auto" asChild>
              <Link href="#trainers">
                Choose a Trainer <ArrowRight size={18} />
              </Link>
            </Button>
            <Button variant="glass" size="lg" className="text-base px-10 py-6 h-auto" asChild>
              <Link href="/coaches">
                View All Coaches
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
