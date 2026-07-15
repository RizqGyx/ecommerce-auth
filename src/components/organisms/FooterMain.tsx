"use client";

import Image from "next/image";
import Link from "next/link";
import ContactInfo from "@/components/molecules/FooterContactInfo";

const footerLinks: Record<string, Array<{ label: string; href: string }>> = {
  Programs: [
    { label: "Personal Training", href: "/personal-trainer" },
    { label: "Group Classes", href: "/classes" },
    { label: "Class Schedule", href: "/schedule" },
    { label: "Coaches", href: "/coaches" },
  ],
  Explore: [
    { label: "Shop", href: "/shop" },
    { label: "News & Tips", href: "/news" },
    { label: "About S-One", href: "/about" },
    { label: "Membership Plans", href: "/membership" },
  ],
  Membership: [
    { label: "Starter Plan", href: "/membership" },
    { label: "Premium Plan", href: "/membership" },
    { label: "Elite Plan", href: "/membership" },
    { label: "Join Now", href: "/register" },
  ],
  Account: [
    { label: "My Dashboard", href: "/dashboard" },
    { label: "Sign In", href: "/login" },
    { label: "Create Account", href: "/register" },
    { label: "Contact Us", href: "/about" },
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
        Experience the future of fitness with cutting-edge technology, expert
        training, and a community that pushes your limits every day.
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
