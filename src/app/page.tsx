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

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <HowItWorksSection />
      <FeaturedClassesSection />
      <WhyUsSection />
      <MembershipPreviewSection />
      <CoachesPreviewSection />
      <TestimonialsSection />
      <NewsPreviewSection />
      <FinalCTASection />
    </>
  );
}
