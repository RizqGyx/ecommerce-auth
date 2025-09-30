"use client";

import { MapPin, Phone, Mail } from "lucide-react";

const FooterContactInfo = () => (
  <div className="space-y-4 text-sm">
    <div className="flex items-center gap-3">
      <MapPin size={16} className="text-primary" />
      <span>Sapiran, Kec. Aur Birugo Tigo Baleh, Kota Bukittinggi</span>
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
);

export default FooterContactInfo;
