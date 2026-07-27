"use client";

import Image from "next/image";
import Link from "next/link";
import ContactInfo from "@/components/molecules/FooterContactInfo";

const footerLinks: Record<string, Array<{ label: string; href: string }>> = {
  Program: [
    { label: "Personal Training", href: "/personal-trainer" },
    { label: "Kelas Grup", href: "/classes" },
    { label: "Jadwal Kelas", href: "/schedule" },
    { label: "Coach", href: "/coaches" },
  ],
  Jelajahi: [
    { label: "Shop", href: "/shop" },
    { label: "Berita & Tips", href: "/news" },
    { label: "Galeri", href: "/gallery" },
    { label: "Tentang S-One", href: "/about" },
  ],
  Membership: [
    { label: "Paket Membership", href: "/membership" },
    { label: "Testimoni", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
    { label: "Gabung Sekarang", href: "/register" },
  ],
  Akun: [
    { label: "Dashboard Saya", href: "/dashboard" },
    { label: "Masuk", href: "/login" },
    { label: "Buat Akun", href: "/register" },
    { label: "Hubungi Kami", href: "/contact" },
  ],
};

const FooterMain = () => (
  <div className="grid md:grid-cols-6 gap-12 mb-16">
    {/* Brand Section */}
    <div className="md:col-span-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
          <Image src="/Icon.png" alt="S-One Gym Logo" width={40} height={40} />
        </div>
        <div>
          <h3 className="text-2xl font-bold gradient-text">S-One Gym</h3>
          <p className="text-sm text-muted-foreground">
            Transform Beyond Limits
          </p>
        </div>
      </div>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        Rasakan masa depan fitness dengan teknologi mutakhir, pelatihan ahli,
        dan komunitas yang mendorong batasmu setiap hari.
      </p>
      <ContactInfo />
    </div>

    {/* Links */}
    {Object.entries(footerLinks).map(([title, links]) => (
      <div key={title}>
        <h4 className="font-bold text-sm mb-5 text-foreground uppercase tracking-widest">{title}</h4>
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default FooterMain;
