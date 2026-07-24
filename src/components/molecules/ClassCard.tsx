import Link from "next/link";
import { Clock, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ClassTypeData {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: number;
  color: string;
  colorSolid: string;
  icon: string;
  benefits: string[];
}

interface ClassCardProps {
  cls: ClassTypeData;
  /** compact: home preview (no benefits). full: classes page (with benefits) */
  variant?: "compact" | "full";
  className?: string;
}

const ClassCard = ({ cls, variant = "compact", className }: ClassCardProps) => {
  return (
    <Link
      href={variant === "compact" ? `/schedule` : `/classes/${cls.id}`}
      className={cn(
        "group relative glass rounded-2xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1",
        className
      )}
    >
      {/* Gradient top bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cls.color}`} />

      {/* Background glow on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${cls.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      {/* Full variant: visual icon header */}
      {variant === "full" && (
        <div
          className={`relative h-36 bg-gradient-to-br ${cls.color} flex items-center justify-center overflow-hidden`}
          style={{ opacity: 0.12 }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${cls.color}`} style={{ opacity: 1 }} />
          <span className="relative text-7xl group-hover:scale-110 transition-transform duration-300 select-none">
            {cls.icon}
          </span>
        </div>
      )}

      <div className="p-6 relative z-10">
        {variant === "compact" && (
          <div className="flex items-start justify-between mb-4">
            <span className="text-4xl">{cls.icon}</span>
          </div>
        )}

        <h3
          className={cn(
            "font-bold mb-2 group-hover:transition-colors duration-300",
            variant === "compact" ? "text-xl" : "text-xl"
          )}
        >
          {cls.name}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {cls.description}
        </p>

        {/* Benefits — full variant only */}
        {variant === "full" && (
          <div className="grid grid-cols-2 gap-1.5 mb-5">
            {cls.benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ChevronRight size={12} className={cls.colorSolid} />
                {benefit}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border/20">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock size={14} />
            <span className="text-xs">{cls.duration} min</span>
          </div>
          {variant === "compact" ? (
            <div
              className={`flex items-center gap-1 text-xs font-semibold ${cls.colorSolid} group-hover:gap-2 transition-all duration-300`}
            >
              Book Now <ArrowRight size={12} />
            </div>
          ) : (
            <Button variant="neon" size="sm" asChild>
              <span>
                Book <ArrowRight size={14} />
              </span>
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ClassCard;
