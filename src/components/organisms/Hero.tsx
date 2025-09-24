import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Zap, Trophy } from "lucide-react";
import Image from "next/image";

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
      <div className="relative z-10 text-center max-w-6xl mx-auto px-8">
        {/* Floating Icons */}
        <div className="absolute -top-20 -left-20 text-primary opacity-30">
          <Zap size={48} />
        </div>
        <div className="absolute -top-10 -right-20 text-accent opacity-30">
          <Trophy size={40} />
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight md:text-left">
          <span>Transform Your</span>
          <span className="gradient-text"> Body </span>
          <span>Unlock Your</span>
          <span className="gradient-text"> Potential</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl mx-auto text-muted-foreground max-w-3xl mb-12 md:mx-0 md:text-left">
          Experience the future of fitness with cutting-edge technology, expert
          training, and a community that pushes your limits.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center md:justify-start">
          <Button
            variant="hero"
            size="lg"
            className="text-lg px-12 py-6 h-auto w-2/3 sm:w-auto"
          >
            <Zap className="mr-2" />
            Join Now
          </Button>
          <Button
            variant="neon"
            size="lg"
            className="text-lg px-12 py-6 h-auto w-2/3 sm:w-auto"
          >
            <Play className="mr-2" />
            See Membership Plans
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
