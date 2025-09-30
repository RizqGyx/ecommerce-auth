"use client";

import FooterInput from "@/components/atoms/footer/FooterInput";
import FooterButton from "@/components/atoms/footer/FooterButton";

const FooterNewsLetter = () => {
  return (
    <div className="glass rounded-2xl p-8 mb-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-xl font-bold mb-2">Stay Updated</h4>
          <p className="text-muted-foreground">
            Get the latest fitness tips, exclusive offers, and updates.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <FooterInput
            type="email"
            placeholder="Enter your email"
            className="flex-1 md:w-64"
          />
          <FooterButton>Subscribe</FooterButton>
        </div>
      </div>
    </div>
  );
};

export default FooterNewsLetter;
