import React from "react";
import { Heading } from "@/components/atoms/home/Heading";
import { GradientText } from "@/components/atoms/home/GradientText";
import { Subtitle } from "@/components/atoms/home/Subtitle";
import { CTAButtons } from "@/components/molecules/CTAButtons";
import { FloatingIcon } from "@/components/atoms/home/FloatingIcon";
import { Zap, Trophy } from "lucide-react";

export const HeroContent = () => (
  <div className="relative z-10 text-center max-w-6xl mx-auto px-8">
    {/* Floating Icons */}
    <FloatingIcon
      icon={Zap}
      size={48}
      className="-top-20 -left-20 text-primary"
    />
    <FloatingIcon
      icon={Trophy}
      size={40}
      className="-top-10 -right-20 text-accent"
    />

    <Heading>
      <span>Transform Your</span>
      <GradientText> Body </GradientText>
      <span>Unlock Your</span>
      <GradientText> Potential</GradientText>
    </Heading>

    <Subtitle>
      Experience the future of fitness with cutting-edge technology, expert
      training, and a community that pushes your limits.
    </Subtitle>

    <CTAButtons />
  </div>
);
