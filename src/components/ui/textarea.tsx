import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full px-3 py-2.5 rounded-xl bg-card border border-border/30 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
