import { Shield, Zap, Trophy, Users, Clock, Star } from "lucide-react";

const FEATURES = [
  {
    icon: Trophy,
    title: "Pelatih Bersertifikat",
    desc: "Semua coach kami tersertifikasi nasional & internasional dengan pengalaman rata-rata 8+ tahun di bidangnya.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/20",
  },
  {
    icon: Zap,
    title: "Equipment Modern",
    desc: "Ratusan unit alat dari brand premium — terbaru dan selalu terawat.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
  {
    icon: Shield,
    title: "Keamanan & Kebersihan",
    desc: "CCTV 24 jam, loker digital, ruang steril standar medis.",
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/20",
  },
  {
    icon: Clock,
    title: "Buka 24 Jam, 7 Hari",
    desc: "Latih kapan saja sesuai jadwal hidupmu — dini hari, larut malam, weekend.",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
  },
  {
    icon: Users,
    title: "Komunitas Supportif",
    desc: "5.000+ anggota aktif yang saling memotivasi.",
    color: "text-pink-400",
    bg: "bg-pink-400/10 border-pink-400/20",
  },
  {
    icon: Star,
    title: "Program Tersertifikasi",
    desc: "Kurikulum yang terus diperbarui mengikuti riset olahraga terkini.",
    color: "text-orange-400",
    bg: "bg-orange-400/10 border-orange-400/20",
  },
];

const WhyUsSection = () => {
  const [hero, sidekick, ...rest] = FEATURES;
  const HeroIcon = hero.icon;
  const SidekickIcon = sidekick.icon;

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">
            Why Choose Us
          </span>
          <h2 className="text-4xl lg:text-5xl font-black">
            More than a <span className="gradient-text">Gym</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Fasilitas kelas dunia, pelatih berpengalaman, dan komunitas yang mendukung perjalanan fitnesmu.
          </p>
        </div>

        <div className="space-y-5">
          {/* Row 1: hero (2 cols) + sidekick (1 col) — always exactly 3 columns, never a gap */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className={`lg:col-span-2 relative group glass rounded-3xl border p-8 flex flex-col md:flex-row md:items-center gap-6 overflow-hidden ${hero.bg}`}>
              <div className={`shrink-0 inline-flex w-16 h-16 rounded-2xl ${hero.bg} border items-center justify-center`}>
                <HeroIcon size={32} className={hero.color} />
              </div>
              <div>
                <h3 className="text-2xl font-black mb-3 group-hover:gradient-text transition-all">{hero.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{hero.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["ACE", "NASM", "FIT3D", "CrossFit L2"].map((cert) => (
                    <span key={cert} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-400/15 text-yellow-300 border border-yellow-400/20">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={`group glass rounded-3xl border p-6 flex flex-col justify-center gap-4 ${sidekick.bg}`}>
              <div className={`inline-flex w-12 h-12 rounded-xl ${sidekick.bg} border items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <SidekickIcon size={22} className={sidekick.color} />
              </div>
              <div>
                <h3 className="font-black text-base mb-1.5">{sidekick.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{sidekick.desc}</p>
              </div>
            </div>
          </div>

          {/* Row 2: remaining features — uniform grid, wraps cleanly at any count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {rest.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`group glass rounded-2xl border p-6 flex flex-col gap-4 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 ${feature.bg}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.bg} border group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} className={feature.color} />
                  </div>
                  <div>
                    <h3 className="font-black text-base mb-1.5">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats strip spanning full width */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/20 rounded-2xl overflow-hidden border border-border/20">
            {[
              { value: "5,000+", label: "Anggota Aktif" },
              { value: "20+", label: "Program Kelas" },
              { value: "98%", label: "Kepuasan Member" },
              { value: "8 Tahun", label: "Berpengalaman" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card/60 px-6 py-5 text-center hover:bg-card/80 transition-colors">
                <div className="text-2xl font-black gradient-text mb-0.5">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
