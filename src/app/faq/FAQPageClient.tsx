"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/atoms/Reveal";

interface FAQGroup {
  category: string;
  faqs: { q: string; a: string }[];
}

function AccordionItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="glass rounded-2xl border border-border/20 overflow-hidden transition-all duration-300 hover:border-primary/20">
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 p-6 text-left">
        <span className="font-semibold text-sm sm:text-base">{q}</span>
        <ChevronDown size={18} className={`text-primary shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-6 pt-0">
          <div className="h-px bg-border/20 mb-4" />
          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPageClient({ groups }: { groups: FAQGroup[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/8" />
        <div className="absolute inset-0 hologram-lines opacity-10" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
            Frequently Asked
          </span>
          <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
            Pertanyaan yang <span className="gradient-text">Sering Ditanyakan.</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            Semua yang perlu kamu tahu soal membership, kelas, pembayaran, dan akun — kalau masih
            ada yang belum terjawab, tim kami siap bantu.
          </p>
        </div>
      </section>

      {/* FAQ groups */}
      <div className="max-w-3xl mx-auto px-6 space-y-12">
        {groups.map((group, gi) => (
          <Reveal key={group.category} index={gi} staggerMs={60}>
            <h2 className="text-xs font-bold tracking-widest uppercase text-primary mb-4">
              {group.category}
            </h2>
            <div className="space-y-3">
              {group.faqs.map((faq) => {
                const key = `${group.category}-${faq.q}`;
                return (
                  <AccordionItem
                    key={key}
                    q={faq.q}
                    a={faq.a}
                    isOpen={openKey === key}
                    onToggle={() => setOpenKey(openKey === key ? null : key)}
                  />
                );
              })}
            </div>
          </Reveal>
        ))}
      </div>

      {/* Still have questions CTA */}
      <Reveal className="max-w-3xl mx-auto px-6 mt-16">
        <div className="relative glass rounded-3xl border border-primary/20 p-8 lg:p-10 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-accent/5" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={22} className="text-primary" />
            </div>
            <h2 className="text-xl font-black mb-2">Masih ada pertanyaan?</h2>
            <p className="text-sm text-muted-foreground mb-6">Tim kami siap bantu lewat WhatsApp atau email.</p>
            <Button variant="hero" asChild>
              <Link href="/contact">
                Hubungi Kami <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
