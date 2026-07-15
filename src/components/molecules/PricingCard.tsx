import Link from "next/link";
import { Check, X, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingCardProps {
  id: string;
  name: string;
  tagline: string;
  price: number;
  color: string;
  borderColor: string;
  popular?: boolean;
  features: PricingFeature[];
  href?: string;
  ctaLabel?: string;
  /** If true, shows full feature list. If false, shows 5 features max */
  compact?: boolean;
}

const PricingCard = ({
  name,
  tagline,
  price,
  color,
  borderColor,
  popular = false,
  features,
  href = "/membership",
  ctaLabel,
  compact = false,
}: PricingCardProps) => {
  const displayFeatures = compact ? features.slice(0, 5) : features;
  const label = ctaLabel ?? (popular ? `Get ${name}` : `Start ${name}`);

  return (
    <div
      className={`relative glass rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        popular
          ? `${borderColor} shadow-xl shadow-primary/20`
          : `${borderColor} hover:border-primary/20`
      }`}
    >
      {popular && (
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-6 py-1.5 rounded-b-xl flex items-center gap-1">
            <Star size={11} fill="currentColor" />
            MOST POPULAR
          </div>
        </div>
      )}

      <div className={`h-1 w-full bg-gradient-to-r ${color}`} />

      <div className={`p-6 lg:p-8 ${popular && !compact ? "pt-4" : ""}`}>
        <h3 className={`font-black mb-1 ${compact ? "text-xl" : "text-2xl"}`}>{name}</h3>
        <p className="text-sm text-muted-foreground mb-6">{tagline}</p>

        <div className="mb-8">
          <div className="flex items-end gap-1">
            <span className="text-sm text-muted-foreground">Rp</span>
            <span className={`font-black gradient-text ${compact ? "text-4xl" : "text-5xl"}`}>
              {price.toLocaleString("id-ID")}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            per month{compact ? "" : ", billed monthly"}
          </span>
        </div>

        <ul className="space-y-3 mb-8">
          {displayFeatures.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              {f.included ? (
                <Check size={16} className="text-primary shrink-0" />
              ) : (
                <X size={16} className="text-muted-foreground/30 shrink-0" />
              )}
              <span className={f.included ? "" : "text-muted-foreground/40 line-through"}>
                {f.text}
              </span>
            </li>
          ))}
        </ul>

        <Button
          variant={popular ? "hero" : "neon"}
          className="w-full"
          size={compact ? "default" : "lg"}
          asChild
        >
          <Link href={href}>
            {label} <ArrowRight size={16} />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
