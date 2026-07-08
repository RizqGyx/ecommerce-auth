import Link from "next/link";
import { Instagram, Award, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CoachCardData {
  id: string;
  name: string;
  slug: string;
  title: string;
  bio: string;
  specialties: string[];
  certifications: string[];
  experience: number;
  instagram?: string;
  featured?: boolean;
  isPersonalTrainer?: boolean;
  pricePerSession?: number;
  achievements?: string;
}

interface CoachCardProps {
  coach: CoachCardData;
  /** compact: used in preview section (grid of 4). full: used in coaches page */
  variant?: "compact" | "full";
  className?: string;
}

const CoachCard = ({ coach, variant = "full", className }: CoachCardProps) => {
  const initials = coach.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  if (variant === "compact") {
    return (
      <Link
        href={`/coaches/${coach.id}`}
        className={cn(
          "group relative glass rounded-2xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10",
          className
        )}
      >
        {/* Avatar */}
        <div className="relative h-56 bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden">
          <div className="text-7xl opacity-30 select-none font-black">{initials}</div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/90" />
          {coach.isPersonalTrainer && (
            <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full">
              PT
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-bold text-base mb-0.5 group-hover:text-primary transition-colors duration-300">
            {coach.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">{coach.title}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {coach.specialties.slice(0, 2).map((spec) => (
              <span
                key={spec}
                className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {spec}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/20">
            <div className="flex items-center gap-1">
              <Award size={12} className="text-yellow-400" />
              <span>{coach.experience}y experience</span>
            </div>
            {coach.instagram && (
              <div className="flex items-center gap-1">
                <Instagram size={12} />
                <span className="truncate max-w-20">{coach.instagram}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "group glass rounded-2xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10",
        className
      )}
    >
      {/* Photo */}
      <div className="relative h-64 bg-gradient-to-br from-secondary via-muted to-card flex items-center justify-center overflow-hidden">
        <div className="text-8xl font-black opacity-10 select-none gradient-text">{initials}</div>
        <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/30 to-transparent" />

        <div className="absolute top-3 left-3 flex gap-2">
          {coach.isPersonalTrainer && (
            <span className="bg-primary/90 text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">
              Personal Trainer
            </span>
          )}
          {coach.featured && (
            <span className="bg-accent/90 text-accent-foreground text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Star size={9} fill="currentColor" /> Featured
            </span>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-black text-xl leading-tight">{coach.name}</h3>
          <p className="text-sm text-primary">{coach.title}</p>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {coach.bio}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {coach.specialties.map((spec) => (
            <span
              key={spec}
              className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              {spec}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between py-3 border-y border-border/20 mb-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Award size={14} className="text-yellow-400" />
            <span>{coach.experience} years exp.</span>
          </div>
          {coach.pricePerSession && (
            <div className="text-right">
              <span className="text-xs text-muted-foreground">PT from </span>
              <span className="font-bold text-primary text-sm">
                Rp {coach.pricePerSession.toLocaleString("id-ID")}
              </span>
            </div>
          )}
        </div>

        <div className="mb-4">
          {coach.certifications.slice(0, 2).map((cert) => (
            <div key={cert} className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
              {cert}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="neon" size="sm" className="flex-1" asChild>
            <Link href={`/coaches/${coach.id}`}>Lihat Profil</Link>
          </Button>
          {coach.isPersonalTrainer && (
            <Button variant="hero" size="sm" className="flex-1" asChild>
              <Link href={`/personal-trainer/book?trainer=${coach.id}`}>
                Book PT <ArrowRight size={14} />
              </Link>
            </Button>
          )}
          {coach.instagram && (
            <a
              href={`https://instagram.com/${coach.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-border/30 text-muted-foreground hover:text-pink-400 hover:border-pink-400/30 transition-colors shrink-0"
            >
              <Instagram size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachCard;
