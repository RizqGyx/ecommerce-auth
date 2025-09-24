import React from "react";
import Image from "next/image";
import { HeroContent } from "@/components/molecules/HeroContent";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Hero.png"
          alt="Futuristic gym interior"
          className="object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
        <div className="absolute inset-0 hologram-lines opacity-80"></div>
      </div>

      {/* Animated Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-glow rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-accent/30 to-primary/30 rounded-full blur-3xl opacity-20"></div>

      {/* Content */}
      <HeroContent />
    </section>
  );
};

export default Hero;
