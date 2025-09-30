"use client";

import React from "react";

interface IconLinkProps {
  href: string;
  label: string;
  icon: React.ElementType;
}

const FooterIconLink: React.FC<IconLinkProps> = ({ href, label, icon: Icon }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:glow-blue transition-all duration-300 hover:scale-110"
  >
    <Icon size={18} className="text-primary" />
  </a>
);

export default FooterIconLink;
