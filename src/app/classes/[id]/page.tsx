import { cache } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, ChevronRight, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";

const getClassType = cache((id: string) => prisma.classType.findUnique({ where: { id } }));

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

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero */}
      <div className={`relative bg-gradient-to-br ${cls.color} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 hologram-lines opacity-10" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} /> Semua Kelas
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <span className="text-7xl">{cls.icon}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white">{cls.name}</h1>
            </div>
          </div>
          <p className="text-lg text-white/80 max-w-xl leading-relaxed">{cls.description}</p>
          <div className="flex items-center gap-2 mt-4 text-white/60 text-sm">
            <Clock size={14} />
            <span>{cls.duration} menit per sesi</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
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
            <div className="glass rounded-2xl border border-primary/20 p-6">
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
      </div>
    </div>
  );
}
