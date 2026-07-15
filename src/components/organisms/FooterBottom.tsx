"use client";

import IconLink from "@/components/atoms/footer/FooterIconLinks";
import { Music2, Instagram, Youtube, Facebook } from "lucide-react";

const socialLinks = [
  { icon: Music2, href: "https://www.tiktok.com/@s.onegym", label: "Tiktok" },
  {
    icon: Instagram,
    href: "https://www.instagram.com/s.onegym",
    label: "Instagram",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/@s.onegym",
    label: "YouTube",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=61575124169778",
    label: "Facebook",
  },
];

const FooterBottom = () => (
  <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border/30">
    {/* Social Links */}
    <div className="flex gap-4">
      {socialLinks.map((social) => (
        <IconLink key={social.label} {...social} />
      ))}
    </div>

    {/* Operating Hours */}
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-1">Operating Hours</p>
      <p className="text-sm font-semibold">06.00 - 23.00</p>
    </div>

    {/* Copyright */}
    <p className="text-sm text-muted-foreground">
      © {new Date().getFullYear()} Muhammad Rizki. All rights reserved.
    </p>
  </div>
);

export default FooterBottom;
