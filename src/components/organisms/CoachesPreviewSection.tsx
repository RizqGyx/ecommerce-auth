import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Award, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

const AVATAR_GRADIENTS = [
  "from-blue-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-purple-500 to-pink-600",
  "from-teal-500 to-cyan-600",
];

const CoachesPreviewSection = async () => {
  const featured = await prisma.coach.findMany({
    where: { featured: true },
    orderBy: { name: "asc" },
    take: 4,
  });
  const hero = featured[0];
  const rest = featured.slice(1);

  if (!hero) return null;

  const heroInitials = hero.name.split(" ").map((n) => n[0]).join("");

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">
              Coach Ahli
            </span>
            <h2 className="text-4xl lg:text-6xl font-black leading-none">
              Kenali <span className="gradient-text">Tim Kami</span>
            </h2>
          </div>
          <Button variant="neon" size="sm" className="shrink-0 self-start md:self-auto" asChild>
            <Link href="/coaches">Semua Coach <ArrowRight size={16} className="ml-1" /></Link>
          </Button>
        </div>

        {/* Editorial split: dominant portrait + borderless roster list — a masthead, not a card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">
          {/* Hero portrait — full-bleed photo, name as large typography directly on the image */}
          <Link
            href={`/coaches/${hero.id}`}
            className="lg:col-span-3 group relative rounded-3xl overflow-hidden min-h-[420px] lg:min-h-[560px]"
          >
            {hero.imageUrl ? (
              <Image
                src={hero.imageUrl}
                alt={hero.name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary flex items-center justify-center">
                <span className="text-9xl font-black opacity-10 select-none">{heroInitials}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />

            {hero.isPersonalTrainer && (
              <span className="absolute top-6 left-6 bg-primary/90 text-primary-foreground text-[11px] font-bold px-3 py-1.5 rounded-full">
                Personal Trainer
              </span>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-10">
              <p className="text-primary text-sm font-semibold mb-1">{hero.title}</p>
              <h3 className="text-4xl lg:text-6xl font-black text-white leading-[0.95] mb-4 group-hover:text-primary transition-colors duration-300">
                {hero.name}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed max-w-lg mb-5 line-clamp-2">{hero.bio}</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5 text-white/80 text-xs">
                  <Award size={13} className="text-yellow-400" />
                  {hero.experience} tahun pengalaman
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:gap-2.5 transition-all duration-300">
                  Lihat Profil <ArrowUpRight size={13} />
                </div>
              </div>
            </div>
          </Link>

          {/* Roster list — no card chrome, just photo + name rows like a masthead credits list */}
          <div className="lg:col-span-2 flex flex-col">
            {rest.map((coach, i) => {
              const initials = coach.name.split(" ").map((n) => n[0]).join("");
              return (
                <Link
                  key={coach.id}
                  href={`/coaches/${coach.id}`}
                  className="group flex items-center gap-4 py-5 border-b border-border/15 first:pt-0 last:border-0 hover:pl-2 transition-all duration-300"
                >
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                    {coach.imageUrl ? (
                      <Image
                        src={coach.imageUrl}
                        alt={coach.name}
                        fill
                        sizes="64px"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} flex items-center justify-center`}>
                        <span className="text-lg font-black text-white/90 select-none">{initials}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-lg leading-tight group-hover:text-primary transition-colors truncate">
                        {coach.name}
                      </h4>
                      {coach.isPersonalTrainer && (
                        <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                          PT
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-primary/80 truncate mb-1">{coach.title}</p>
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span>{coach.experience} th pengalaman</span>
                      {coach.instagram && (
                        <span className="flex items-center gap-1 truncate">
                          <Instagram size={10} className="shrink-0" />
                          {coach.instagram}
                        </span>
                      )}
                    </div>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-muted-foreground/40 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
                  />
                </Link>
              );
            })}

            {/* CTA banner, anchored to the bottom of the list */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/5 border border-primary/20 p-6 mt-6">
              <div className="absolute inset-0 hologram-lines opacity-10" />
              <div className="relative z-10">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Personal Training</p>
                <p className="font-black text-lg mb-3">Latihan bersama trainer bersertifikat</p>
                <Button variant="hero" size="sm" className="w-full sm:w-auto" asChild>
                  <Link href="/personal-trainer">
                    Book Sesi PT <ArrowRight size={14} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachesPreviewSection;
