import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, Zap } from "lucide-react";
import MagneticButton from "@/components/atoms/motion/MagneticButton";

export const CTAButtons = () => (
  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center md:justify-start">
    <MagneticButton className="w-2/3 sm:w-auto">
      <Button
        variant="hero"
        size="lg"
        className="text-lg px-12 py-6 h-auto w-full sm:w-auto"
        asChild
      >
        <Link href="/register">
          <Zap className="mr-2" /> Gabung Sekarang
        </Link>
      </Button>
    </MagneticButton>
    <Button
      variant="neon"
      size="lg"
      className="text-lg px-12 py-6 h-auto w-2/3 sm:w-auto"
      asChild
    >
      <Link href="/membership">
        <Play className="mr-2" /> Lihat Paket Membership
      </Link>
    </Button>
  </div>
);
