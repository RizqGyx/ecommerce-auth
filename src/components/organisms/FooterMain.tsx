"use client";

import Image from "next/image";
import Link from "next/link";
import ContactInfo from "@/components/molecules/FooterContactInfo";

const footerLinks: Record<string, string[]> = {
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
        <h4 className="font-bold text-lg mb-6 text-foreground">{title}</h4>
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
);

export default FooterMain;
