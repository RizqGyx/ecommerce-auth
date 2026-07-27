import { cache } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Award, Instagram, Star, CheckCircle, ArrowRight, Sparkles, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import Reveal from "@/components/atoms/Reveal";

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
    features: ["4 × sesi PT 60 menit", "Asesmen kebugaran awal", "Panduan nutrisi dasar", "Program latihan kustom"],
  },
  {
    id: "transform",
    name: "Transform",
    sessions: 8,
    price: 1300000,
    validDays: 30,
    popular: true,
    features: ["8 × sesi PT 60 menit", "Asesmen kebugaran lengkap", "Rencana nutrisi personal", "Program latihan kustom", "Dukungan via WhatsApp"],
  },
  {
    id: "elite",
    name: "Elite",
    sessions: 16,
    price: 2400000,
    validDays: 60,
    features: ["16 × sesi PT 60 menit", "Analisis komposisi tubuh lengkap", "Coaching nutrisi lanjutan", "Program periodisasi 8 minggu", "Dukungan WhatsApp harian"],
  },
];

const COACH_ENVIRONMENT: Record<string, { photo: string; caption: string }> = {
  "rina-sari": { photo: "/gym/dance-studio.jpg", caption: "Studio A — tempat Rina memimpin Zumba & Poundfit setiap minggu" },
  "budi-santoso": { photo: "/gym/boxing-ring.jpg", caption: "Zona Tempur — ring tempat Budi membentuk petarung baru" },
  "ahmad-rizky": { photo: "/gym/interior-wide.jpg", caption: "Area latihan utama — basis Ahmad membangun kekuatan bodyweight" },
  "sari-dewi": { photo: "/gym/yoga-studio.jpg", caption: "Yoga Studio — ruang tenang tempat Sari memandu setiap sesi" },
  "doni-prasetyo": { photo: "/gym/interior-wide.jpg", caption: "Area latihan beban — tempat Doni menyusun program strength & powerlifting" },
};

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

  const environment = COACH_ENVIRONMENT[coach.slug];

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero — full-bleed portrait, name as large typography directly on the photo */}
      <div className="relative min-h-[520px] lg:min-h-[620px] overflow-hidden">
        {coach.imageUrl ? (
          <Image
            src={coach.imageUrl}
            alt={coach.name}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-accent/15 to-secondary flex items-center justify-center">
            <span className="text-[12rem] font-black opacity-10 select-none">{initials}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 hologram-lines opacity-10" />

        <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-between py-8 min-h-[520px] lg:min-h-[620px]">
          <Link
            href="/coaches"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors w-fit"
          >
            <ArrowLeft size={14} /> Semua Coach
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {coach.isPersonalTrainer && (
                  <span className="bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    Personal Trainer
                  </span>
                )}
                {coach.featured && (
                  <span className="bg-yellow-400/20 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-yellow-400/30">
                    <Star size={10} fill="currentColor" /> Coach Unggulan
                  </span>
                )}
              </div>
              <p className="text-primary text-lg font-semibold mb-1">{coach.title}</p>
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-[0.95] mb-4">{coach.name}</h1>
              {coach.instagram && (
                <a
                  href={`https://instagram.com/${coach.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-pink-400 transition-colors"
                >
                  <Instagram size={14} />
                  {coach.instagram}
                </a>
              )}
            </div>

            {coach.isPersonalTrainer && (
              <Button variant="hero" size="lg" className="shrink-0 w-fit" asChild>
                <Link href={`/personal-trainer/book?trainer=${coach.id}`}>
                  Book Sesi PT <ArrowRight size={16} />
                </Link>
              </Button>
            )}
          </div>

          {/* Stat strip — large typography, not buried in a sidebar box */}
          <div className="flex flex-wrap gap-8 lg:gap-12 mt-8 pt-6 border-t border-white/10">
            <div>
              <div className="text-4xl lg:text-5xl font-black text-white leading-none">{coach.experience}</div>
              <div className="text-xs text-white/60 uppercase tracking-widest mt-1">Tahun Pengalaman</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-black text-white leading-none">{coach.specialties.length}</div>
              <div className="text-xs text-white/60 uppercase tracking-widest mt-1">Spesialisasi</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-black text-white leading-none">{sessions.length}</div>
              <div className="text-xs text-white/60 uppercase tracking-widest mt-1">Sesi / Minggu</div>
            </div>
            {coach.pricePerSession && (
              <div>
                <div className="text-4xl lg:text-5xl font-black gradient-text leading-none">
                  {(coach.pricePerSession / 1000).toFixed(0)}k
                </div>
                <div className="text-xs text-white/60 uppercase tracking-widest mt-1">Per Sesi PT</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Reveal className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio — editorial pull-quote treatment, this is a person, not a program */}
            <div className="relative glass rounded-2xl border border-border/20 p-6 lg:p-8 overflow-hidden">
              <div className="absolute top-4 left-5 text-6xl font-black text-primary/15 leading-none select-none">
                &ldquo;
              </div>
              <div className="relative z-10">
                <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                  Tentang {coach.name.split(" ")[0]}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg pl-2">{coach.bio}</p>
              </div>
              {coach.achievements && (
                <div className="relative z-10 mt-5 p-3 rounded-xl bg-yellow-400/5 border border-yellow-400/20 flex items-center gap-2.5">
                  <Award size={16} className="text-yellow-400 shrink-0" />
                  <span className="text-sm font-medium">{coach.achievements}</span>
                </div>
              )}
            </div>

            {/* Specialties — expertise band, not sidebar chips */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={15} className="text-primary" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Spesialisasi</h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {coach.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="text-sm px-4 py-2 rounded-full bg-secondary/40 border border-border/20 text-foreground/90 font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="glass rounded-2xl border border-border/20 p-6">
              <h2 className="text-xl font-black mb-4">Sertifikasi</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {coach.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2.5 text-sm p-3 rounded-xl bg-secondary/30">
                    <CheckCircle size={14} className="text-primary shrink-0" />
                    {cert}
                  </div>
                ))}
              </div>
            </div>

            {/* Full-bleed environment photo — a second real space beyond the portrait */}
            {environment && (
              <div className="relative h-64 lg:h-80 rounded-3xl overflow-hidden">
                <Image
                  src={environment.photo}
                  alt={environment.caption}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center gap-2">
                  <Dumbbell size={14} className="text-primary shrink-0" />
                  <p className="text-sm text-white/80 font-medium">{environment.caption}</p>
                </div>
              </div>
            )}

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
            <div className="glass rounded-2xl border border-border/20 p-5 sticky top-24">
              <h3 className="font-bold text-sm mb-4">Booking Cepat</h3>
              <div className="space-y-2.5 text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sesi kelas / minggu</span>
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

              {coach.isPersonalTrainer && (
                <Button variant="hero" className="w-full mb-2" asChild>
                  <Link href={`/personal-trainer/book?trainer=${coach.id}`}>
                    Book Sesi PT <ArrowRight size={14} />
                  </Link>
                </Button>
              )}

              <Button variant="neon" className="w-full" asChild>
                <Link href="/coaches">Lihat Coach Lain</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
