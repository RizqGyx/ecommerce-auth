import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Target, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STATS, FACILITIES } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import Reveal from "@/components/atoms/Reveal";
import AnimatedCounter from "@/components/atoms/motion/AnimatedCounter";

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
    event: "S-One Gym Berdiri",
    desc: "Dimulai dari ruang kecil dengan mimpi besar di jantung Kota Bukittinggi.",
  },
  {
    year: "2020",
    event: "Program Kelas Pertama",
    desc: "Meluncurkan Zumba, Yoga, dan Muay Thai bersama coach pendiri kami.",
  },
  {
    year: "2022",
    event: "Perluasan Fasilitas",
    desc: "Berkembang menjadi 1.500m² dengan studio khusus, area ring, dan sauna.",
  },
  {
    year: "2023",
    event: "500+ Member Aktif",
    desc: "Mencapai milestone besar dan meluncurkan sistem membership digital.",
  },
  {
    year: "2024",
    event: "Sistem Akses QR",
    desc: "Memperkenalkan akses QR code tanpa kontak — gym pertama di Bukittinggi yang melakukannya.",
  },
  {
    year: "2025",
    event: "2.000+ Member",
    desc: "S-One menjadi destinasi fitness utama Bukittinggi dengan 20+ coach.",
  },
];

const MISSION_VALUES = [
  {
    icon: Target,
    label: "Misi",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    borderColor: "border-primary/20",
    accentColor: "from-primary/20 to-transparent",
    text: "Menghadirkan coaching dan fasilitas fitness kelas dunia yang bisa diakses oleh setiap orang di Bukittinggi — apa pun titik awal mereka.",
  },
  {
    icon: Eye,
    label: "Visi",
    iconColor: "text-accent",
    iconBg: "bg-accent/10",
    borderColor: "border-accent/20",
    accentColor: "from-accent/20 to-transparent",
    text: "Menjadi lingkungan fitness paling transformatif di Sumatra Barat — tempat setiap member pulang lebih kuat dari saat mereka datang.",
  },
  {
    icon: Heart,
    label: "Nilai",
    iconColor: "text-red-400",
    iconBg: "bg-red-400/10",
    borderColor: "border-red-400/20",
    accentColor: "from-red-400/20 to-transparent",
    text: "Keunggulan, kebersamaan, dan kejujuran. Kami membangun hasil nyata lewat kerja keras, bimbingan ahli, dan budaya yang mengangkat semua orang.",
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
                Cerita Kami
              </span>
              <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
                Dibangun untuk Mereka yang{" "}
                <span className="gradient-text">Serius</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                S-One Gym didirikan oleh atlet yang lelah dengan gym seadanya, alat usang, dan
                coach yang cuma menonton. Kami membangun gym yang selalu kami impikan — premium,
                smart, dan fokus habis-habisan pada hasilmu.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link href="/membership">
                  Gabung Sekarang <ArrowRight size={18} />
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

              {/* 2×2 bento grid — real facility photos */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "🏋️", name: "Area Beban", image: "/gym/interior-wide.jpg", accent: "border-primary/20 hover:border-primary/50" },
                  { icon: "💃", name: "Studio A", image: "/gym/dance-studio.jpg", accent: "border-accent/20 hover:border-accent/50" },
                  { icon: "🥊", name: "Zona Tempur", image: "/gym/boxing-ring.jpg", accent: "border-red-400/20 hover:border-red-400/50" },
                  { icon: "🧘", name: "Yoga Studio", image: "/gym/yoga-studio.jpg", accent: "border-yellow-500/20 hover:border-yellow-500/50" },
                ].map((tile, i) => (
                  <div
                    key={i}
                    className={`group relative h-36 rounded-2xl overflow-hidden border ${tile.accent} flex flex-col items-center justify-center text-center gap-2 transition-all duration-300 hover:-translate-y-1`}
                  >
                    <Image
                      src={tile.image}
                      alt={tile.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                    <span className="relative text-3xl drop-shadow-lg">{tile.icon}</span>
                    <span className="relative text-xs font-semibold text-white">{tile.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Strip ─── */}
      <Reveal><section className="py-16 overflow-hidden bg-secondary/20">
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
                <AnimatedCounter value={stat.value} className="text-5xl lg:text-7xl font-black gradient-text leading-none mb-2 block" />
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section></Reveal>

      {/* ─── Mission / Vision / Values ─── */}
      <Reveal><section className="max-w-5xl mx-auto px-6 py-24 space-y-6">
        <div className="text-center mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">
            Siapa Kami
          </span>
          <h2 className="text-3xl lg:text-4xl font-black">
            Apa yang <span className="gradient-text">Menggerakkan Kami</span>
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
      </section></Reveal>

      {/* ─── Timeline ─── */}
      <Reveal><section className="bg-secondary/20 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">
              Sejak 2019
            </span>
            <h2 className="text-3xl lg:text-4xl font-black">
              Perjalanan <span className="gradient-text">Kami</span>
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
      </section></Reveal>

      {/* ─── Facilities Bento Grid ─── */}
      <Reveal><section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">
            Ruang Kelas Dunia
          </span>
          <h2 className="text-3xl lg:text-4xl font-black">
            Fasilitas <span className="gradient-text">Kami</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
            1.500m² ruang latihan premium yang dirancang untuk setiap tipe atlet.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px]">
          {/* Large tiles — row-span-2, real photo backgrounds */}
          {FACILITIES.filter((f) => f.size === "large").map((f, i) => (
            <div
              key={f.name}
              className={`relative row-span-2 rounded-2xl overflow-hidden border border-border/20 flex flex-col justify-end p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 group ${
                i === 0 ? "md:col-span-2" : ""
              }`}
            >
              {f.image && (
                <Image
                  src={f.image}
                  alt={f.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-background/10" />
              <span className="relative text-5xl mb-3 block group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                {f.icon}
              </span>
              <h3 className="relative font-bold text-sm mb-1">{f.name}</h3>
              <p className="relative text-xs text-muted-foreground leading-relaxed hidden sm:block">
                {f.desc}
              </p>
            </div>
          ))}

          {/* Medium tiles — real photo backgrounds where available */}
          {FACILITIES.filter((f) => f.size === "medium").map((f) => (
            <div
              key={f.name}
              className="relative rounded-2xl overflow-hidden border border-border/20 flex flex-col justify-between p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10 group"
            >
              {f.image ? (
                <>
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-background/5" />
                </>
              ) : (
                <div className="absolute inset-0 glass" />
              )}
              <span className="relative text-3xl block group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                {f.icon}
              </span>
              <div className="relative">
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
      </section></Reveal>

      {/* ─── Contact Teaser ─── */}
      <Reveal><section className="bg-secondary/20 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative glass rounded-3xl border border-primary/20 p-10 lg:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-accent/5" />
            <div className="absolute inset-0 hologram-lines opacity-10" />
            <div className="relative z-10">
              <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">
                Hubungi Kami
              </span>
              <h2 className="text-3xl lg:text-4xl font-black mb-4">
                Ada Pertanyaan? <span className="gradient-text">Hubungi Kami.</span>
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Sapiran, Kota Bukittinggi · Buka setiap hari — WhatsApp, email, atau langsung datang ke lokasi.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <Link href="/contact">
                    Hubungi Kami <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button variant="neon" size="lg" asChild>
                  <Link href="/membership">Mulai Hari Ini</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section></Reveal>
    </div>
  );
}
