import React from "react";

export const Subtitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xl md:text-2xl mx-auto text-muted-foreground max-w-3xl mb-12 md:mx-0 md:text-left">
    {children}
  </p>
);
