import Link from "next/link";
import { ArrowRight, Award, Instagram, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

const AVATAR_GRADIENTS = [
  "from-blue-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-purple-500 to-pink-600",
  "from-teal-500 to-cyan-600",
  "from-orange-500 to-pink-600",
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">
              Expert Coaches
            </span>
            <h2 className="text-4xl lg:text-5xl font-black">
              Meet the <span className="gradient-text">Team</span>
            </h2>
          </div>
          <Button variant="neon" size="sm" className="shrink-0 self-start md:self-auto" asChild>
            <Link href="/coaches">All Coaches <ArrowRight size={16} className="ml-1" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Featured hero coach — spans 2 rows */}
          <Link
            href={`/coaches/${hero.id}`}
            className="lg:col-span-1 lg:row-span-2 group relative glass rounded-3xl overflow-hidden border border-border/20 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
            style={{ minHeight: "480px" }}
          >
            {/* Avatar */}
            <div className="relative h-72 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary flex items-center justify-center overflow-hidden">
              <span className="text-9xl font-black opacity-8 select-none gradient-text">{heroInitials}</span>
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                {hero.isPersonalTrainer && (
                  <span className="bg-primary/90 text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">
                    Personal Trainer
                  </span>
                )}
                {hero.featured && (
                  <span className="bg-yellow-400/20 text-yellow-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-yellow-400/30">
                    <Star size={9} fill="currentColor" /> Featured
                  </span>
                )}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-black mb-0.5 group-hover:text-primary transition-colors duration-300">
                {hero.name}
              </h3>
              <p className="text-sm text-primary mb-3">{hero.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{hero.bio}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {hero.specialties.slice(0, 3).map((spec) => (
                  <span key={spec} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {spec}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/20 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Award size={14} className="text-yellow-400" />
                  <span>{hero.experience} years exp.</span>
                </div>
                {hero.pricePerSession && (
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">PT from </span>
                    <span className="font-bold text-primary">Rp {hero.pricePerSession.toLocaleString("id-ID")}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                Lihat Profil <ArrowRight size={13} />
              </div>
            </div>
          </Link>

          {/* Right side: compact coach cards — uniform grid, wraps cleanly at any count */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((coach, i) => {
              const initials = coach.name.split(" ").map((n) => n[0]).join("");
              return (
                <Link
                  key={coach.id}
                  href={`/coaches/${coach.id}`}
                  className="group glass rounded-2xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className={`relative h-44 bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} flex items-center justify-center overflow-hidden`}>
                    <span className="text-6xl font-black text-white/25 select-none">{initials}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                    {coach.isPersonalTrainer && (
                      <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                        PT
                      </div>
                    )}
                    <div className="absolute bottom-3 left-4 right-4">
                      <p className="font-black text-base leading-tight group-hover:text-primary transition-colors">{coach.name}</p>
                      <p className="text-xs text-primary/80 truncate">{coach.title}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {coach.specialties.slice(0, 2).map((spec) => (
                        <span key={spec} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Award size={11} className="text-yellow-400" />
                        {coach.experience}y exp
                      </div>
                      {coach.instagram && (
                        <div className="flex items-center gap-1">
                          <Instagram size={11} />
                          <span className="truncate max-w-16">{coach.instagram}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* CTA banner */}
            <div className="sm:col-span-2 lg:col-span-3 relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/5 border border-primary/20 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="absolute inset-0 hologram-lines opacity-10" />
              <div className="relative z-10">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Personal Training</p>
                <p className="font-black text-xl">Latihan bersama trainer bersertifikat</p>
                <p className="text-sm text-muted-foreground mt-1">Program custom · Monitoring penuh · Hasil nyata</p>
              </div>
              <Button variant="hero" size="sm" className="shrink-0 relative z-10" asChild>
                <Link href="/personal-trainer">
                  Book PT Session <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachesPreviewSection;
