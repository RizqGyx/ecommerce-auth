import { STATS } from "@/lib/data";
import { TrendingUp } from "lucide-react";
import AnimatedCounter from "@/components/atoms/motion/AnimatedCounter";

const StatsSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/3 to-primary/5" />
      <div className="absolute inset-0 hologram-lines opacity-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top label */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary px-4">
            <TrendingUp size={12} /> S-One dalam angka
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30" />
        </div>

        {/* Stats grid — varied sizes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, index) => {
            const isBig = index === 0;
            return (
              <div
                key={index}
                className={`group relative glass rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 overflow-hidden ${isBig ? "lg:col-span-1" : ""}`}
              >
                {/* Glow corner accent */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors duration-300" />

                <div className="relative p-6 text-center">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <AnimatedCounter value={stat.value} className="text-3xl lg:text-4xl font-black gradient-text mb-1 block" />
                  <div className="text-xs text-muted-foreground font-semibold tracking-widest uppercase">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          {["Berdiri sejak 2017", "ISO 9001 Certified", "Top 10 Gym Bukittinggi 2024", "5★ Google Reviews"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary/60" /> {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
