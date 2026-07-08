import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  iconBg?: string;
  align?: "left" | "center";
  className?: string;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  align = "left",
  className,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "group relative glass rounded-2xl p-6 border border-border/20 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5",
        align === "center" && "text-center",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex p-3 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300",
          iconBg,
          align === "center" && "mx-auto"
        )}
      >
        <Icon size={24} className={iconColor} />
      </div>
      <h3 className="font-bold text-base mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
