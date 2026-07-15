import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Target,
  Eye,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { STATS } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tentang Kami",
  description:
    "Kenali S-One Gym Bukittinggi lebih dekat — visi misi, fasilitas, dan cerita di balik gym futuristik pertama di Bukittinggi.",
  path: "/about",
});

/* ─────────────────────────── Local data ─────────────────────────── */

const TIMELINE = [
  {
    year: "2019",
    event: "S-One Gym Founded",
    desc: "Started with a small space and big dreams in the heart of Bukittinggi.",
  },
  {
    year: "2020",
    event: "First Class Programs",
    desc: "Launched Zumba, Yoga, and Muay Thai with our founding coaches.",
  },
  {
    year: "2022",
    event: "Facility Expansion",
    desc: "Expanded to 1,500m² with dedicated studios, a ring area, and sauna.",
  },
  {
    year: "2023",
    event: "500+ Active Members",
    desc: "Reached a major milestone and launched our digital membership system.",
  },
  {
    year: "2024",
    event: "QR Access System",
    desc: "Introduced contactless QR code entry — the first gym in Bukittinggi to do so.",
  },
  {
    year: "2025",
    event: "2,000+ Members",
    desc: "S-One becomes Bukittinggi's premier fitness destination with 20+ coaches.",
  },
];

const FACILITIES = [
  {
    icon: "🏋️",
    name: "Weight Training Area",
    desc: "1000+ sqm of free weights, machines, and functional training equipment.",
    size: "large",
  },
  {
    icon: "💃",
    name: "Studio A — Dance & Cardio",
    desc: "Dedicated mirrored studio for Zumba, Poundfit, and aerobic classes.",
    size: "large",
  },
  {
    icon: "🥊",
    name: "Combat Zone",
    desc: "Full ring, heavy bags, and striking equipment for Muay Thai training.",
    size: "medium",
  },
  {
    icon: "🤸",
    name: "Calisthenics Area",
    desc: "Outdoor and indoor rigs, parallettes, and skill training stations.",
    size: "medium",
  },
  {
    icon: "🧘",
    name: "Yoga Studio",
    desc: "Serene, soundproofed space with premium mats and props.",
    size: "medium",
  },
  {
    icon: "🔥",
    name: "Premium Sauna",
    desc: "Finnish dry sauna, 80–90°C, accommodating 8 guests.",
    size: "medium",
  },
  {
    icon: "🚿",
    name: "Locker Rooms",
    desc: "Secure lockers, showers, and toiletries for Premium & Elite members.",
    size: "small",
  },
  {
    icon: "☕",
    name: "S-One Café Corner",
    desc: "Protein shakes, juices, and healthy snacks after your session.",
    size: "small",
  },
];

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Address",
    value: "Jl. Sudirman No. 88, Bukittinggi, Sumatera Barat 26112",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+62 812-3456-7890",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@s-onegym.id",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

const HOURS = [
  { day: "Monday – Friday", hours: "06:00 – 22:00" },
  { day: "Saturday", hours: "07:00 – 21:00" },
  { day: "Sunday", hours: "08:00 – 20:00" },
  { day: "Public Holidays", hours: "08:00 – 18:00" },
];

const MISSION_VALUES = [
  {
    icon: Target,
    label: "Mission",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    borderColor: "border-primary/20",
    accentColor: "from-primary/20 to-transparent",
    text: "To make world-class fitness coaching and facilities accessible to every person in Bukittinggi — regardless of their starting point.",
  },
  {
    icon: Eye,
    label: "Vision",
    iconColor: "text-accent",
    iconBg: "bg-accent/10",
    borderColor: "border-accent/20",
    accentColor: "from-accent/20 to-transparent",
    text: "To become the most transformative fitness environment in West Sumatra — where every member leaves stronger than they arrived.",
  },
  {
    icon: Heart,
    label: "Values",
    iconColor: "text-red-400",
    iconBg: "bg-red-400/10",
    borderColor: "border-red-400/20",
    accentColor: "from-red-400/20 to-transparent",
    text: "Excellence, community, and honesty. We build real results through hard work, expert guidance, and a culture that lifts everyone up.",
  },
];

/* ─────────────────────────── Page ─────────────────────────── */

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* ─── Hero ─── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/8" />
        <div className="absolute inset-0 hologram-lines opacity-10" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: headline + body + CTA */}
            <div>
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
                Our Story
              </span>
              <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
                Built for People Who{" "}
                <span className="gradient-text">Take It Seriously</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                S-One Gym was founded by athletes who were tired of mediocre gyms with
                outdated equipment and coaches who just watched. We built the gym we always
                wished existed — premium, smart, and relentlessly focused on your results.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link href="/membership">
                  Join the Community <ArrowRight size={18} />
                </Link>
              </Button>
            </div>

            {/* Right: bento mini-grid of facility previews */}
            <div className="relative">
              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 z-20 animate-float">
                <span className="inline-block px-3 py-1.5 rounded-full glass border border-primary/30 text-xs font-bold text-primary shadow-lg shadow-primary/20">
                  Est. 2019
                </span>
              </div>
              <div className="absolute -bottom-4 -right-4 z-20 animate-float-slow">
                <span className="inline-block px-3 py-1.5 rounded-full glass border border-yellow-500/30 text-xs font-bold text-yellow-400 shadow-lg shadow-yellow-500/20">
                  Bukittinggi #1
                </span>
              </div>

              {/* 2×2 bento grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "🏋️", name: "Weight Area", accent: "border-primary/20 hover:border-primary/50" },
                  { icon: "💃", name: "Studio A", accent: "border-accent/20 hover:border-accent/50" },
                  { icon: "🥊", name: "Combat Zone", accent: "border-red-400/20 hover:border-red-400/50" },
                  { icon: "🔥", name: "Sauna", accent: "border-yellow-500/20 hover:border-yellow-500/50" },
                ].map((tile, i) => (
                  <div
                    key={i}
                    className={`glass rounded-2xl p-6 border ${tile.accent} flex flex-col items-center justify-center text-center gap-2 transition-all duration-300 hover:-translate-y-1 ${
                      i === 0 ? "row-span-1" : ""
                    }`}
                  >
                    <span className="text-4xl">{tile.icon}</span>
                    <span className="text-xs font-semibold text-muted-foreground">{tile.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Strip ─── */}
      <section className="py-16 overflow-hidden bg-secondary/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className={`flex-1 text-center transition-all ${
                  i === 0
                    ? "sm:-translate-y-4"
                    : i === 2
                    ? "sm:translate-y-4"
                    : ""
                }`}
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-5xl lg:text-7xl font-black gradient-text leading-none mb-2">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Mission / Vision / Values ─── */}
      <section className="max-w-5xl mx-auto px-6 py-24 space-y-6">
        <div className="text-center mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">
            Who We Are
          </span>
          <h2 className="text-3xl lg:text-4xl font-black">
            What <span className="gradient-text">Drives Us</span>
          </h2>
        </div>

        {MISSION_VALUES.map((item, i) => {
          const Icon = item.icon;
          const isEven = i % 2 === 0;
          return (
            <div
              key={item.label}
              className={`glass rounded-3xl border ${item.borderColor} p-8 flex flex-col md:flex-row ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8 transition-all duration-300 hover:-translate-y-1 hover:border-opacity-60`}
            >
              {/* Icon */}
              <div className={`shrink-0 w-20 h-20 rounded-2xl ${item.iconBg} flex items-center justify-center`}>
                <Icon size={36} className={item.iconColor} />
              </div>

              {/* Divider accent */}
              <div
                className={`hidden md:block w-px self-stretch bg-gradient-to-b ${item.accentColor}`}
              />

              {/* Text */}
              <div className={isEven ? "" : "md:text-right"}>
                <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${item.iconColor}`}>
                  {item.label}
                </div>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* ─── Timeline ─── */}
      <section className="bg-secondary/20 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">
              Since 2019
            </span>
            <h2 className="text-3xl lg:text-4xl font-black">
              Our <span className="gradient-text">Journey</span>
            </h2>
          </div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-accent/60 to-transparent" />

            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`md:w-1/2 ${
                      i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    } pl-10 md:pl-0`}
                  >
                    <div className="glass rounded-2xl p-5 border border-border/20 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 group">
                      {/* Year badge */}
                      <span
                        className={`inline-block text-xs font-black px-3 py-1 rounded-full mb-3 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/20 gradient-text ${
                          i % 2 === 0 ? "md:ml-auto md:block" : ""
                        }`}
                      >
                        {item.year}
                      </span>
                      <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                        {item.event}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Animated dot on line */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background shadow-lg shadow-primary/50 relative">
                      <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Facilities Bento Grid ─── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">
            World-Class Space
          </span>
          <h2 className="text-3xl lg:text-4xl font-black">
            Our <span className="gradient-text">Facilities</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
            1,500m² of premium training space designed for every type of athlete.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px]">
          {/* Large tiles — row-span-2 */}
          {FACILITIES.filter((f) => f.size === "large").map((f, i) => (
            <div
              key={f.name}
              className={`row-span-2 glass rounded-2xl p-6 border border-border/20 flex flex-col justify-end transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 group ${
                i === 0 ? "md:col-span-2" : ""
              }`}
            >
              <span className="text-5xl mb-3 block group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </span>
              <h3 className="font-bold text-sm mb-1">{f.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed hidden sm:block">
                {f.desc}
              </p>
            </div>
          ))}

          {/* Medium tiles */}
          {FACILITIES.filter((f) => f.size === "medium").map((f) => (
            <div
              key={f.name}
              className="glass rounded-2xl p-4 border border-border/20 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10 group"
            >
              <span className="text-3xl block group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </span>
              <div>
                <h3 className="font-bold text-xs mb-0.5">{f.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed hidden md:block line-clamp-2">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Small tiles */}
          {FACILITIES.filter((f) => f.size === "small").map((f) => (
            <div
              key={f.name}
              className="glass rounded-2xl p-4 border border-border/20 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/30 group"
            >
              <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </span>
              <div>
                <h3 className="font-bold text-xs">{f.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section className="bg-secondary/20 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">
              Get In Touch
            </span>
            <h2 className="text-3xl lg:text-4xl font-black">
              Find <span className="gradient-text">Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: contact cards stacked */}
            <div className="space-y-4">
              {CONTACT_INFO.map((info) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.label}
                    className="glass rounded-2xl p-5 border border-border/20 hover:border-primary/20 transition-all duration-300 flex items-center gap-4 group hover:-translate-y-0.5"
                  >
                    <div
                      className={`shrink-0 w-12 h-12 rounded-xl ${info.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={20} className={info.color} />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">
                        {info.label}
                      </div>
                      <div className="font-semibold text-sm">{info.value}</div>
                    </div>
                  </div>
                );
              })}

              {/* CTA below contacts */}
              <div className="pt-2">
                <Button variant="hero" size="lg" asChild>
                  <Link href="/membership">
                    Start Today <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Hours schedule card */}
            <div className="glass rounded-3xl border border-border/20 overflow-hidden">
              {/* Card header */}
              <div className="bg-gradient-to-r from-primary/15 via-accent/10 to-primary/5 px-6 py-5 border-b border-border/20 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-bold">Operating Hours</div>
                  <div className="text-xs text-muted-foreground">Open almost every day</div>
                </div>
              </div>

              {/* Hours rows */}
              <div className="divide-y divide-border/10">
                {HOURS.map((h, i) => (
                  <div
                    key={h.day}
                    className={`flex items-center justify-between px-6 py-4 transition-colors hover:bg-white/[0.02] ${
                      i === 0 ? "bg-primary/[0.03]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Colored day indicator dot */}
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          i === 0
                            ? "bg-primary"
                            : i === 1
                            ? "bg-accent"
                            : i === 2
                            ? "bg-yellow-400"
                            : "bg-muted-foreground/40"
                        }`}
                      />
                      <span className="text-sm text-muted-foreground">{h.day}</span>
                    </div>
                    <span className={`text-sm font-bold ${i < 3 ? "gradient-text" : "text-muted-foreground"}`}>
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer note */}
              <div className="px-6 py-4 bg-muted/20 border-t border-border/10">
                <p className="text-xs text-muted-foreground text-center">
                  Premium & Elite members enjoy{" "}
                  <span className="text-primary font-semibold">24/7 access</span> via QR scan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
