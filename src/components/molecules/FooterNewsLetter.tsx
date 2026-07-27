"use client";

import { useState } from "react";
import FooterInput from "@/components/atoms/footer/FooterInput";
import FooterButton from "@/components/atoms/footer/FooterButton";

const FooterNewsLetter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <div className="glass rounded-2xl p-8 mb-12">
      {subscribed ? (
        <div className="flex items-center justify-center gap-3 text-center py-2">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-bold text-primary text-sm">Kamu sudah berlangganan!</p>
            <p className="text-xs text-muted-foreground mt-0.5">Cek inbox untuk email selamat datang.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold mb-2">Tetap Update</h4>
            <p className="text-muted-foreground">
              Dapatkan tips fitness terbaru, penawaran eksklusif, dan info terkini.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <FooterInput
              type="email"
              placeholder="Masukkan emailmu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 md:w-64"
            />
            <FooterButton type="submit">Langganan</FooterButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default FooterNewsLetter;
