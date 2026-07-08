import { cn } from "@/lib/utils";

interface PageHeroProps {
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
  glowColor?: "primary" | "accent" | "both";
  className?: string;
}

const PageHero = ({
  badge,
  title,
  subtitle,
  children,
  glowColor = "primary",
  className,
}: PageHeroProps) => {
  return (
    <section className={cn("relative py-20 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />
      <div className="absolute inset-0 hologram-lines opacity-20" />
      {(glowColor === "both" || glowColor === "primary") && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl" />
      )}
      {(glowColor === "both" || glowColor === "accent") && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/8 rounded-full blur-3xl" />
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        {badge && (
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-4 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
            {badge}
          </span>
        )}
        <h1 className="text-4xl lg:text-6xl font-black mb-4">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};

export default PageHero;
