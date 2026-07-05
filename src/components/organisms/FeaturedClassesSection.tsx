import Link from "next/link";
import { ArrowRight, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

const LEVEL_LABELS: Record<string, string> = {
  ALL_LEVELS: "All Levels",
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

const FeaturedClassesSection = async () => {
  const classTypes = await prisma.classType.findMany({ orderBy: { name: "asc" } });
  const [hero, ...rest] = classTypes;

  if (!hero) return null;

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">
              What We Offer
            </span>
            <h2 className="text-4xl lg:text-5xl font-black">
              Our <span className="gradient-text">Classes</span>
            </h2>
          </div>
          <Button variant="neon" size="sm" className="shrink-0 self-start md:self-auto" asChild>
            <Link href="/classes">View All Classes <ArrowRight size={16} className="ml-1" /></Link>
          </Button>
        </div>

        {/* Spotlight banner — one flagship class, full width */}
        <Link
          href={`/classes/${hero.id}`}
          className="group relative rounded-3xl overflow-hidden cursor-pointer block h-64 lg:h-72 mb-6"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${hero.color}`} />
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-500" />
          <div className="absolute inset-0 hologram-lines opacity-20" />
          <div className="relative z-10 h-full flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-10 p-8 lg:p-10">
            <span className="text-7xl lg:text-8xl shrink-0">{hero.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-white/60 uppercase tracking-widest border border-white/20 px-2 py-0.5 rounded-full">
                  {LEVEL_LABELS[hero.level] ?? hero.level}
                </span>
                <div className="flex items-center gap-1 text-white/60 text-xs">
                  <Clock size={11} /> {hero.duration} min
                </div>
              </div>
              <h3 className="text-3xl lg:text-5xl font-black text-white mb-2">{hero.name}</h3>
              <p className="text-white/70 text-sm leading-relaxed line-clamp-2 max-w-xl mb-5 lg:mb-0">
                {hero.description}
              </p>
            </div>
            <div className="shrink-0 inline-flex items-center gap-2 bg-white/10 group-hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 group-hover:gap-3 self-start lg:self-center">
              Lihat Detail <ArrowRight size={14} />
            </div>
          </div>
        </Link>

        {/* Uniform card grid — every other class, reflows cleanly at any count */}
        {rest.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {rest.map((cls) => (
              <Link
                key={cls.id}
                href={`/classes/${cls.id}`}
                className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cls.color}`} />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-300" />
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <span className="text-3xl">{cls.icon}</span>
                  <div>
                    <h3 className="text-base font-black text-white leading-tight">{cls.name}</h3>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="flex items-center gap-1 text-[10px] text-white/60">
                        <Clock size={9} /> {cls.duration} min
                      </span>
                      <ChevronRight size={14} className="text-white/50 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedClassesSection;
