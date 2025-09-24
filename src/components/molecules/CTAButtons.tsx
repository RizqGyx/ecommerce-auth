import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Zap } from "lucide-react";

export const CTAButtons = () => (
  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center md:justify-start">
    <Button
      variant="hero"
      size="lg"
      className="text-lg px-12 py-6 h-auto w-2/3 sm:w-auto"
    >
      <Zap className="mr-2" /> Join Now
    </Button>
    <Button
      variant="neon"
      size="lg"
      className="text-lg px-12 py-6 h-auto w-2/3 sm:w-auto"
    >
      <Play className="mr-2" /> See Membership Plans
    </Button>
  </div>
);
