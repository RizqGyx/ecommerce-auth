import { cache } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, ChevronRight, Calendar, ArrowRight, Sparkles, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import Reveal from "@/components/atoms/Reveal";

const getClassType = cache((id: string) => prisma.classType.findUnique({ where: { id } }));

const CLASS_STORIES: Record<
  string,
  { paragraphs: string[]; untukSiapa: string[]; photo: string; caption: string }
> = {
  zumba: {
    paragraphs: [
      "Zumba bukan sekadar olahraga — ini pesta. Setiap sesi dirancang seperti dance party sungguhan: musik Latin yang menghentak, instruktur yang energik, dan gerakan yang membuatmu lupa kalau sedang berolahraga. Di S-One, kelas Zumba dipimpin oleh Coach Rina yang membawa 8 tahun pengalaman melatih ratusan member menemukan kembali kecintaan mereka pada gerak.",
      "Setiap kelas dimulai dengan pemanasan ringan, lalu masuk ke rangkaian koreografi yang meningkat intensitasnya — dari langkah dasar salsa dan merengue, sampai kombinasi cepat yang bikin jantung berdebar. Tidak perlu jago menari; yang penting kamu ikut gerak dan bersenang-senang.",
    ],
    untukSiapa: [
      "Yang ingin olahraga terasa seperti main, bukan beban",
      "Pemula tanpa pengalaman menari sama sekali",
      "Yang suka suasana kelas rame dan penuh energi",
    ],
    photo: "/gym/dance-studio.jpg",
    caption: "Studio A — tempat setiap sesi Zumba berlangsung",
  },
  poundfit: {
    paragraphs: [
      "Poundfit menggabungkan drumming, cardio, dan sedikit sentuhan Pilates dalam satu paket yang bikin ketagihan. Alih-alih dumbbell, kamu akan memegang sepasang Ripstix — stik drum ringan yang jadi 'alat olahraga' sekaligus alat musik. Setiap gerakan pound, squat, dan lunge disinkronkan dengan ketukan lagu, jadi kamu latihan sambil main musik.",
      "Kelas ini cocok untuk yang bosan dengan rutinitas gym biasa. Ritme lagu menentukan intensitas — semakin cepat lagunya, semakin kerasa juga latihan otot core dan lengan atasmu.",
    ],
    untukSiapa: [
      "Yang suka konsep unik & jarang ditemui di gym lain",
      "Ingin melatih core dan bahu dengan cara yang seru",
      "Suka nge-beat sambil olahraga, bukan cuma ikut gerakan",
    ],
    photo: "/gym/dance-studio.jpg",
    caption: "Studio A — panggung berirama untuk setiap sesi Poundfit",
  },
  "muay-thai": {
    paragraphs: [
      "Muay Thai dikenal sebagai 'Seni Delapan Anggota Tubuh' karena menggunakan tinju, siku, lutut, dan tulang kering sebagai senjata. Ini bukan sekadar sparring — ini disiplin yang melatih ketahanan mental sama seperti fisik. Coach Budi, mantan juara nasional, membawa pengalaman bertarung yang sesungguhnya ke setiap sesi.",
      "Kelas dimulai dengan shadow boxing dan pad work untuk membangun teknik dasar, lalu berkembang ke kombinasi menyerang yang lebih kompleks. Buat yang sudah nyaman, ada sesi sparring ringan dengan proteksi penuh di Zona Tempur kami.",
    ],
    untukSiapa: [
      "Yang ingin belajar bela diri praktis, bukan cuma cardio",
      "Siap dengan latihan intensitas tinggi dan penuh keringat",
      "Tertarik pada disiplin dan kultur combat sport",
    ],
    photo: "/gym/boxing-ring.jpg",
    caption: "Zona Tempur — ring dan heavy bag untuk latihan Muay Thai",
  },
  calisthenics: {
    paragraphs: [
      "Calisthenics adalah seni menguasai berat tubuhmu sendiri — tanpa dumbbell, tanpa mesin, cuma gravitasi dan kontrol. Dari push-up dasar sampai gerakan-gerakan menakjubkan seperti muscle-up dan human flag, kelas ini membangun kekuatan fungsional yang terasa di kehidupan sehari-hari.",
      "Coach Ahmad merancang setiap sesi dengan progresi yang jelas — kamu akan selalu tahu langkah selanjutnya menuju skill berikutnya. Kelas berlangsung di Area Calisthenics kami, dengan rig, parallette, dan stasiun skill lengkap.",
    ],
    untukSiapa: [
      "Yang tertarik pada skill-based training, bukan cuma angkat beban",
      "Ingin membangun kekuatan tanpa perlu alat mahal",
      "Suka tantangan progresif — dari pemula sampai advanced",
    ],
    photo: "/gym/interior-wide.jpg",
    caption: "Area latihan utama S-One Gym",
  },
  yoga: {
    paragraphs: [
      "Yoga di S-One bukan cuma peregangan — ini ruang untuk pulang ke tubuhmu sendiri. Coach Sari, yang berlatih langsung di Bali dan Mysore, India, memandu setiap sesi dengan pendekatan yang lembut namun tetap menantang, memadukan pernapasan, gerakan, dan ketenangan pikiran.",
      "Setiap kelas dimulai dengan pernapasan sadar, mengalir melalui rangkaian asana yang membangun kekuatan sekaligus fleksibilitas, dan ditutup dengan savasana — waktu diam yang sering jadi bagian favorit banyak member.",
    ],
    untukSiapa: [
      "Yang butuh ruang tenang di tengah rutinitas yang padat",
      "Ingin membangun fleksibilitas dan kesadaran tubuh",
      "Semua level — dari yang baru pertama kali coba yoga",
    ],
    photo: "/gym/yoga-studio.jpg",
    caption: "Yoga Studio — ruang tenang kedap suara S-One Gym",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cls = await getClassType(id);
  if (!cls) return buildMetadata({ title: "Kelas Tidak Ditemukan", description: "Kelas yang kamu cari tidak tersedia.", path: `/classes/${id}` });

  return buildMetadata({
    title: cls.name,
    description: cls.description,
    path: `/classes/${id}`,
  });
}

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cls = await getClassType(id);

  if (!cls) notFound();

  const classSessions = await prisma.classSession.findMany({
    where: { classTypeId: cls.id },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
  });

  const sessions = classSessions.map((session) => ({
    day: session.date.toLocaleDateString("en-US", { weekday: "long" }),
    session,
  }));

  const story = CLASS_STORIES[cls.slug];

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero — real photo of the class, leaning into the class's own color as an overlay tint */}
      <div className={`relative bg-gradient-to-br ${cls.color} overflow-hidden`}>
        <Image
          src={`/classes/${cls.slug}.jpg`}
          alt={cls.name}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${cls.color} opacity-40 mix-blend-overlay`} />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 hologram-lines opacity-15" />
        <div className={`absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br ${cls.color} opacity-50 blur-3xl rounded-full pointer-events-none`} />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} /> Semua Kelas
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <span className="text-7xl lg:text-8xl drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]">{cls.icon}</span>
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-none">{cls.name}</h1>
            </div>
          </div>
          <p className="text-lg text-white/80 max-w-xl leading-relaxed">{cls.description}</p>
          <div className="flex items-center gap-2 mt-4 text-white/60 text-sm">
            <Clock size={14} />
            <span>{cls.duration} menit per sesi</span>
          </div>
        </div>
      </div>

      {/* ── Story — the narrative beat that was missing: what this class actually feels like ── */}
      {story && (
        <Reveal className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={16} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Cerita di Balik Kelas</span>
          </div>
          <div className="space-y-5">
            {story.paragraphs.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-xl lg:text-2xl font-medium leading-relaxed text-foreground"
                    : "text-base text-muted-foreground leading-relaxed"
                }
              >
                {para}
              </p>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-border/15">
            <div className="flex items-center gap-2 mb-4">
              <Users2 size={15} className="text-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Cocok Untuk Kamu Yang...</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {story.untukSiapa.map((point) => (
                <span
                  key={point}
                  className="text-sm px-4 py-2 rounded-full bg-secondary/40 border border-border/20 text-foreground/90"
                >
                  {point}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* Full-bleed secondary photo break — a second real space beyond the hero shot */}
      {story && (
        <Reveal className="max-w-7xl mx-auto px-6 mb-4">
          <div className="relative h-72 lg:h-96 rounded-3xl overflow-hidden">
            <Image
              src={story.photo}
              alt={story.caption}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent`} />
            <div className={`absolute inset-0 bg-gradient-to-br ${cls.color} opacity-10 mix-blend-overlay`} />
            <p className="absolute bottom-5 left-6 text-sm text-white/80 font-medium">{story.caption}</p>
          </div>
        </Reveal>
      )}

      <Reveal className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Benefits */}
            <div className="glass rounded-2xl border border-border/20 p-6">
              <h2 className="text-xl font-black mb-5">Apa yang Kamu Dapatkan</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cls.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${cls.color} shrink-0`} />
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            {sessions.length > 0 && (
              <div className="glass rounded-2xl border border-border/20 p-6">
                <h2 className="text-xl font-black mb-5 flex items-center gap-2">
                  <Calendar size={20} className="text-primary" /> Jadwal Tersedia
                </h2>
                <div className="space-y-3">
                  {sessions.slice(0, 6).map(({ day, session }) => (
                    <Link
                      key={session.id}
                      href={`/booking?day=${day}&sessionId=${session.id}`}
                      className="flex items-center justify-between p-4 rounded-xl border border-border/20 hover:border-primary/30 hover:bg-secondary/30 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-1 h-10 rounded-full bg-gradient-to-b ${cls.color}`} />
                        <div>
                          <p className="font-semibold text-sm">{day}</p>
                          <p className="text-xs text-muted-foreground">
                            {session.startTime} – {session.endTime} · {session.room}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            Kapasitas {session.capacity} orang
                          </p>
                          <p className="text-sm font-bold text-primary">
                            Rp {session.price.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <ChevronRight
                          size={16}
                          className="text-muted-foreground group-hover:text-primary transition-colors"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
                {sessions.length > 6 && (
                  <Link href="/schedule" className="block text-center text-sm text-primary hover:underline mt-4">
                    Lihat semua jadwal →
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            <div className="relative glass rounded-2xl border border-border/20 p-6 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${cls.color} opacity-[0.07]`} />
              <div className="relative z-10">
                <div className="text-5xl text-center mb-4">{cls.icon}</div>
                <h3 className="font-black text-lg text-center mb-2">Siap bergabung?</h3>
                <p className="text-sm text-muted-foreground text-center mb-5">
                  Pilih jadwal yang cocok dan book sekarang
                </p>
                <Button variant="hero" className="w-full" asChild>
                  <Link href="/schedule">
                    Book Sekarang <ArrowRight size={14} />
                  </Link>
                </Button>
                <Button variant="neon" className="w-full mt-2" asChild>
                  <Link href="/classes">Lihat Kelas Lain</Link>
                </Button>
              </div>
            </div>

            <div className="glass rounded-2xl border border-border/20 p-5">
              <h3 className="font-bold text-sm mb-3">Info Kelas</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  { label: "Durasi", value: `${cls.duration} menit` },
                  { label: "Sesi per minggu", value: `${sessions.length} sesi` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
