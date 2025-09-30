"use client";

import FooterMain from "@/components/organisms/FooterMain";
import FooterBottom from "@/components/organisms/FooterBottom";
import FooterNewsletter from "@/components/molecules/FooterNewsLetter";

const Footer = () => {
  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute inset-0 hologram-lines opacity-10"></div>

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-glow rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-2xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FooterMain />
        <FooterNewsletter />
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
