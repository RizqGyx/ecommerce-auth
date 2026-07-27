import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowRight, MessageCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import Reveal from "@/components/atoms/Reveal";

export const metadata = buildMetadata({
  title: "Hubungi Kami",
  description:
    "Hubungi S-One Gym Bukittinggi — alamat, nomor WhatsApp, email, dan jam operasional. Kami siap menjawab pertanyaanmu.",
  path: "/contact",
});

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Alamat",
    value: "Sapiran, Kec. Aur Birugo Tigo Baleh, Kota Bukittinggi",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Phone,
    label: "Telepon / WhatsApp",
    value: "+62 896 1846 6292",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    icon: Mail,
    label: "Email",
    value: "bestsonegym@gmail.com",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

const HOURS = [
  { day: "Senin – Jumat", hours: "06:00 – 22:00" },
  { day: "Sabtu", hours: "07:00 – 21:00" },
  { day: "Minggu", hours: "08:00 – 20:00" },
  { day: "Hari Libur Nasional", hours: "08:00 – 18:00" },
];

const CHANNELS = [
  {
    icon: MessageCircle,
    label: "Chat WhatsApp",
    desc: "Respon tercepat untuk pertanyaan membership & jadwal",
    href: "https://wa.me/6289618466292",
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/20",
  },
  {
    icon: Mail,
    label: "Kirim Email",
    desc: "Untuk kerja sama, media, atau pertanyaan detail",
    href: "mailto:bestsonegym@gmail.com",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
  },
  {
    icon: Instagram,
    label: "Instagram DM",
    desc: "Lihat aktivitas terbaru & kirim pesan langsung",
    href: "https://instagram.com/sonegym.bkt",
    color: "text-pink-400",
    bg: "bg-pink-400/10 border-pink-400/20",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/8" />
        <div className="absolute inset-0 hologram-lines opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
            Get In Touch
          </span>
          <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
            Ada Pertanyaan? <span className="gradient-text">Hubungi Kami.</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            Tim S-One siap bantu — soal membership, jadwal kelas, personal training, atau apa pun.
            Pilih cara yang paling nyaman buatmu di bawah ini.
          </p>
        </div>
      </section>

      {/* Contact channels */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CHANNELS.map((ch, i) => (
            <Reveal key={ch.label} index={i} staggerMs={90}>
              <a
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block h-full glass rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${ch.bg}`}
              >
                <div className={`w-12 h-12 rounded-xl ${ch.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <ch.icon size={22} className={ch.color} />
                </div>
                <h3 className="font-bold mb-1.5">{ch.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ch.desc}</p>
                <div className={`flex items-center gap-1.5 text-xs font-semibold mt-4 ${ch.color}`}>
                  Buka <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Location + hours */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: contact info cards */}
          <Reveal className="space-y-4">
            {CONTACT_INFO.map((info) => (
              <div
                key={info.label}
                className="glass rounded-2xl p-5 border border-border/20 hover:border-primary/20 transition-all duration-300 flex items-center gap-4 group hover:-translate-y-0.5"
              >
                <div
                  className={`shrink-0 w-12 h-12 rounded-xl ${info.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <info.icon size={20} className={info.color} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">
                    {info.label}
                  </div>
                  <div className="font-semibold text-sm">{info.value}</div>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Button variant="hero" size="lg" asChild>
                <Link href="/membership">
                  Mulai Sekarang <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </Reveal>

          {/* Right: Hours card */}
          <Reveal delay={120} className="glass rounded-3xl border border-border/20 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/15 via-accent/10 to-primary/5 px-6 py-5 border-b border-border/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-bold">Jam Operasional</div>
                <div className="text-xs text-muted-foreground">Buka hampir setiap hari</div>
              </div>
            </div>

            <div className="divide-y divide-border/10">
              {HOURS.map((h, i) => (
                <div
                  key={h.day}
                  className={`flex items-center justify-between px-6 py-4 transition-colors hover:bg-white/[0.02] ${
                    i === 0 ? "bg-primary/[0.03]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        i === 0 ? "bg-primary" : i === 1 ? "bg-accent" : i === 2 ? "bg-yellow-400" : "bg-muted-foreground/40"
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

            <div className="px-6 py-4 bg-muted/20 border-t border-border/10">
              <p className="text-xs text-muted-foreground text-center">
                Member <span className="text-primary font-semibold">Premium & Elite</span> punya akses 24/7 via QR scan
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
