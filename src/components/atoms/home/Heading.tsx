import React from "react";

export const Heading = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight md:text-left">
    {children}
  </h1>
);
