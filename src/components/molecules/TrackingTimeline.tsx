import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TrackingStep {
  status: string;
  desc: string;
  time: string;
  done: boolean;
}

interface TrackingTimelineProps {
  steps: TrackingStep[];
  className?: string;
}

const TrackingTimeline = ({ steps, className }: TrackingTimelineProps) => {
  const lastDoneIndex = steps.reduce((acc, step, i) => (step.done ? i : acc), -1);

  return (
    <div className={cn("space-y-0", className)}>
      {steps.map((step, i) => {
        const isActive = i === lastDoneIndex + 1 && !step.done;
        return (
          <div key={i} className="flex gap-4">
            {/* Icon + line */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300",
                  step.done
                    ? "bg-primary border-primary shadow-lg shadow-primary/30"
                    : isActive
                    ? "border-primary/60 bg-primary/10 animate-pulse"
                    : "border-border/30 bg-muted/20"
                )}
              >
                {step.done ? (
                  <Check size={14} className="text-primary-foreground" />
                ) : isActive ? (
                  <Clock size={14} className="text-primary" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-border" />
                )}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "w-0.5 flex-1 my-1 min-h-6 transition-all duration-300",
                    step.done ? "bg-primary/50" : "bg-border/20"
                  )}
                />
              )}
            </div>

            {/* Content */}
            <div className={cn("pb-6", i === steps.length - 1 && "pb-0")}>
              <div
                className={cn(
                  "font-semibold text-sm",
                  step.done ? "text-foreground" : isActive ? "text-primary" : "text-muted-foreground/50"
                )}
              >
                {step.status}
              </div>
              {step.desc && (
                <div className={cn("text-xs mt-0.5", step.done ? "text-muted-foreground" : "text-muted-foreground/40")}>
                  {step.desc}
                </div>
              )}
              <div
                className={cn(
                  "text-[10px] mt-1 font-mono",
                  step.done ? "text-primary/70" : isActive ? "text-primary/50" : "text-muted-foreground/30"
                )}
              >
                {step.time}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackingTimeline;
