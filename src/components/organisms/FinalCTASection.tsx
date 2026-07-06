import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-accent/10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
      <div className="absolute inset-0 hologram-lines opacity-20"></div>

      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
          <Zap size={12} fill="currentColor" />
          Start Today
        </div>

        {/* Headline */}
        <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
          Your Best Self is{" "}
          <span className="gradient-text">Waiting</span>
        </h2>

        <p className="text-muted-foreground text-lg lg:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of members who have already transformed their bodies and minds at S-One Gym Bukittinggi.
          First week is on us.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" className="text-base px-10 py-6 h-auto" asChild>
            <Link href="/membership">
              <Zap size={18} />
              Join Now — Free First Week
            </Link>
          </Button>
          <Button variant="glass" size="lg" className="text-base px-10 py-6 h-auto" asChild>
            <Link href="/schedule">
              View Schedule <ArrowRight size={18} />
            </Link>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
            No contracts
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            Cancel anytime
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            Free first week
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
            2,000+ happy members
          </span>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
