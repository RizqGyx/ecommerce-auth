import { cache } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Award, Instagram, Star, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";

const getCoach = cache((id: string) => prisma.coach.findUnique({ where: { id } }));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coach = await getCoach(id);
  if (!coach) return buildMetadata({ title: "Coach Tidak Ditemukan", description: "Coach yang kamu cari tidak tersedia.", path: `/coaches/${id}` });

  return buildMetadata({
    title: `${coach.name} — ${coach.title}`,
    description: coach.bio,
    path: `/coaches/${id}`,
  });
}

const PT_PACKAGES = [
  {
    id: "starter",
    name: "Starter",
    sessions: 4,
    price: 700000,
    validDays: 30,
    features: ["4 × 60-min PT sessions", "Initial fitness assessment", "Basic nutrition guidelines", "Custom workout plan"],
  },
  {
    id: "transform",
    name: "Transform",
    sessions: 8,
    price: 1300000,
    validDays: 30,
    popular: true,
    features: ["8 × 60-min PT sessions", "Full fitness assessment", "Personalized nutrition plan", "Custom workout program", "WhatsApp support"],
  },
  {
    id: "elite",
    name: "Elite",
    sessions: 16,
    price: 2400000,
    validDays: 60,
    features: ["16 × 60-min PT sessions", "Complete body composition analysis", "Advanced nutrition coaching", "Periodized 8-week program", "Daily WhatsApp support"],
  },
];

export default async function CoachDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coach = await getCoach(id);

  if (!coach) notFound();

  const initials = coach.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const classSessions = await prisma.classSession.findMany({
    where: { coachId: coach.id },
    include: { classType: true },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
  });

  const sessions = classSessions.map((session) => ({
    day: session.date.toLocaleDateString("en-US", { weekday: "long" }),
    session: {
      id: session.id,
      class: session.classType.name,
      time: session.startTime,
      endTime: session.endTime,
      room: session.room ?? "",
      price: session.price,
    },
  }));

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-primary/15 to-accent/8 overflow-hidden border-b border-border/20">
        <div className="absolute inset-0 hologram-lines opacity-5" />
        <div className="max-w-7xl mx-auto px-6 py-16 relative">
          <Link
            href="/coaches"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Semua Coach
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center border border-border/30 shrink-0 overflow-hidden">
              <span className="text-5xl font-black opacity-10 select-none">{initials}</span>
              <span className="absolute text-3xl font-black gradient-text">{initials}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-2">
                {coach.isPersonalTrainer && (
                  <span className="bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    Personal Trainer
                  </span>
                )}
                {coach.featured && (
                  <span className="bg-accent/20 text-accent-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> Featured Coach
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-black mb-1">{coach.name}</h1>
              <p className="text-primary text-lg font-medium mb-3">{coach.title}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Award size={14} className="text-yellow-400" />
                  <span>{coach.experience} tahun pengalaman</span>
                </div>
                {coach.instagram && (
                  <a
                    href={`https://instagram.com/${coach.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-pink-400 transition-colors"
                  >
                    <Instagram size={14} />
                    {coach.instagram}
                  </a>
                )}
              </div>
            </div>

            {coach.isPersonalTrainer && (
              <Button variant="hero" size="lg" className="shrink-0" asChild>
                <Link href={`/personal-trainer/book?trainer=${coach.id}`}>
                  Book PT Session <ArrowRight size={16} />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <div className="glass rounded-2xl border border-border/20 p-6">
              <h2 className="text-xl font-black mb-4">
                Tentang {coach.name.split(" ")[0]}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{coach.bio}</p>
              {coach.achievements && (
                <div className="mt-4 p-3 rounded-xl bg-yellow-400/5 border border-yellow-400/20 flex items-center gap-2.5">
                  <Award size={16} className="text-yellow-400 shrink-0" />
                  <span className="text-sm font-medium">{coach.achievements}</span>
                </div>
              )}
            </div>

            {/* Certifications */}
            <div className="glass rounded-2xl border border-border/20 p-6">
              <h2 className="text-xl font-black mb-4">Sertifikasi</h2>
              <div className="space-y-2.5">
                {coach.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle size={14} className="text-primary shrink-0" />
                    {cert}
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            {sessions.length > 0 && (
              <div className="glass rounded-2xl border border-border/20 p-6">
                <h2 className="text-xl font-black mb-5">Jadwal Kelas</h2>
                <div className="space-y-3">
                  {sessions.map(({ day, session }) => (
                    <Link
                      key={`${day}-${session.id}`}
                      href={`/booking?day=${day}&sessionId=${session.id}`}
                      className="flex items-center justify-between p-4 rounded-xl border border-border/20 hover:border-primary/30 hover:bg-secondary/30 transition-all duration-200 group"
                    >
                      <div>
                        <p className="font-semibold text-sm">
                          {session.class} · {day}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {session.time}–{session.endTime} · {session.room}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-primary">
                          Rp {session.price.toLocaleString("id-ID")}
                        </span>
                        <ArrowRight
                          size={14}
                          className="text-muted-foreground group-hover:text-primary transition-colors"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* PT Packages */}
            {coach.isPersonalTrainer && (
              <div>
                <h2 className="text-xl font-black mb-5">Paket Personal Training</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PT_PACKAGES.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`glass rounded-2xl border p-5 transition-all hover:-translate-y-1 ${
                        pkg.popular
                          ? "border-primary/40 shadow-lg shadow-primary/10"
                          : "border-border/20 hover:border-primary/20"
                      }`}
                    >
                      {pkg.popular && (
                        <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">
                          ★ Terpopuler
                        </div>
                      )}
                      <h3 className="font-black text-lg">{pkg.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">
                        {pkg.sessions} sesi · {pkg.validDays} hari
                      </p>
                      <div className="text-2xl font-black gradient-text mb-4">
                        Rp {pkg.price.toLocaleString("id-ID")}
                      </div>
                      <ul className="space-y-1.5 mb-4">
                        {pkg.features.slice(0, 3).map((f) => (
                          <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CheckCircle size={11} className="text-primary shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant={pkg.popular ? "hero" : "neon"}
                        size="sm"
                        className="w-full"
                        asChild
                      >
                        <Link href={`/personal-trainer/book?trainer=${coach.id}&package=${pkg.name}`}>
                          Pilih Paket
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            {/* Specialties */}
            <div className="glass rounded-2xl border border-border/20 p-5">
              <h3 className="font-bold text-sm mb-3">Spesialisasi</h3>
              <div className="flex flex-wrap gap-2">
                {coach.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="glass rounded-2xl border border-border/20 p-5">
              <h3 className="font-bold text-sm mb-3">Info Coach</h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pengalaman</span>
                  <span className="font-bold">{coach.experience} tahun</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sesi / minggu</span>
                  <span className="font-bold">{sessions.length} sesi</span>
                </div>
                {coach.pricePerSession && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Harga PT</span>
                    <span className="font-bold text-primary">
                      Rp {coach.pricePerSession.toLocaleString("id-ID")} / sesi
                    </span>
                  </div>
                )}
              </div>
            </div>

            {coach.isPersonalTrainer && (
              <Button variant="hero" className="w-full" asChild>
                <Link href={`/personal-trainer/book?trainer=${coach.id}`}>
                  Book PT Session <ArrowRight size={14} />
                </Link>
              </Button>
            )}

            <Button variant="neon" className="w-full" asChild>
              <Link href="/coaches">Lihat Coach Lain</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
