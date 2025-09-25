"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Youtube,
  Facebook,
  Music2,
} from "lucide-react";
import Image from "next/image";

type FooterLinks = Record<string, string[]>;

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
}

const footerLinks: FooterLinks = {
  Programs: [
    "Personal Training",
    "Group Classes",
    "Virtual Training",
    "Nutrition Coaching",
  ],
  Facilities: [
    "Cardio Zone",
    "Strength Training",
    "Functional Training",
    "Recovery Center",
  ],
  Membership: ["Basic Plan", "Pro Plan", "Elite Plan", "Corporate Plans"],
  Support: ["Help Center", "Contact Us", "FAQ", "Member Portal"],
};

const socialLinks: SocialLink[] = [
  {
    icon: Music2,
    href: "https://www.tiktok.com/@s.onegym?_t=ZS-8vV6CdHuOHQ&_r=1",
    label: "Tiktok",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/s.onegym?igsh=YjkzM2JhbnhybjU1",
    label: "Instagram",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/@s.onegym?si=iiOtntLDWxUPJADm",
    label: "YouTube",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=61575124169778&mibextid=wwXIfr&rdid=oJvk623FRCO176Lu&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AUbQuU14h%2F%3Fmibextid%3DwwXIfr#",
    label: "Facebook",
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute inset-0 hologram-lines opacity-10"></div>

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-glow rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-2xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-6 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Image
                  src="/Icon.png"
                  alt="S-One Gym Logo"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold gradient-text">S-One Gym</h3>
                <p className="text-sm text-muted-foreground">
                  Transform Beyond Limits
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Experience the future of fitness with cutting-edge technology,
              expert training, and a community that pushes your limits every
              day.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-primary" />
                <span>
                  Sapiran, Kec. Aur Birugo Tigo Baleh, Kota Bukittinggi,
                  Sumatera Barat 26137
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-primary" />
                <span>+62 896 1846 6292</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-primary" />
                <span>bestsonegym@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-lg mb-6 text-foreground">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="glass rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold mb-2">Stay Updated</h4>
              <p className="text-muted-foreground">
                Get the latest fitness tips, exclusive offers, and updates.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transform transition-all duration-300 hover-glow">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border/30">
          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:glow-blue transition-all duration-300 hover:scale-110"
                aria-label={social.label}
                target="_blank"
              >
                <social.icon size={18} className="text-primary" />
              </a>
            ))}
          </div>

          {/* Operating Hours */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">
              Operating Hours
            </p>
            <p className="text-sm font-semibold">06.00 - 23.00</p>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2024 S-One Gym. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
