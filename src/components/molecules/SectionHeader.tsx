import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
}

const SectionHeader = ({
  badge,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionHeaderProps) => {
  const isCenter = align === "center";

  return (
    <div className={cn(isCenter ? "text-center" : "", className)}>
      {badge && (
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-4 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl lg:text-5xl font-black mb-4",
          isCenter && "mx-auto",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-muted-foreground text-lg",
            isCenter && "max-w-2xl mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
