import Hero from "@/components/organisms/Hero";
import StatsSection from "@/components/organisms/StatsSection";
import HowItWorksSection from "@/components/organisms/HowItWorksSection";
import FeaturedClassesSection from "@/components/organisms/FeaturedClassesSection";
import WhyUsSection from "@/components/organisms/WhyUsSection";
import MembershipPreviewSection from "@/components/organisms/MembershipPreviewSection";
import CoachesPreviewSection from "@/components/organisms/CoachesPreviewSection";
import TestimonialsSection from "@/components/organisms/TestimonialsSection";
import NewsPreviewSection from "@/components/organisms/NewsPreviewSection";
import FinalCTASection from "@/components/organisms/FinalCTASection";
import Reveal from "@/components/atoms/Reveal";

export default function HomePage() {
  return (
    <>
      {/* Discover — hook, then immediate credibility */}
      <Hero />
      <Reveal><StatsSection /></Reveal>

      {/* Trust — why us, who's behind it, what members say */}
      <Reveal><WhyUsSection /></Reveal>
      <Reveal><CoachesPreviewSection /></Reveal>
      <Reveal><TestimonialsSection /></Reveal>

      {/* Try — what you'd actually do here */}
      <Reveal><HowItWorksSection /></Reveal>
      <Reveal><FeaturedClassesSection /></Reveal>

      {/* Join — convert */}
      <Reveal><MembershipPreviewSection /></Reveal>
      <Reveal><NewsPreviewSection /></Reveal>
      <Reveal><FinalCTASection /></Reveal>
    </>
  );
}
