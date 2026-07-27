"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/atoms/Reveal";
import type { ReviewTargetType } from "@/generated/prisma";

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  category: ReviewTargetType;
}

const TABS: { id: "all" | ReviewTargetType; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "CLASS_SESSION", label: "Kelas" },
  { id: "PT_BOOKING", label: "Personal Training" },
  { id: "PRODUCT", label: "Produk" },
];

export default function TestimonialsPageClient({
  items,
  avgRating,
  totalCount,
}: {
  items: TestimonialItem[];
  avgRating: number;
  totalCount: number;
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("all");
  const filtered = tab === "all" ? items : items.filter((t) => t.category === tab);

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-background" />
        <div className="absolute inset-0 hologram-lines opacity-10" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
            Member Stories
          </span>
          <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
            Real People, <span className="gradient-text">Real Results.</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Cerita nyata dari member yang sudah booking kelas, latihan bersama personal trainer,
            atau belanja di S-One Store.
          </p>

          {totalCount > 0 && (
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-border/20">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold">{avgRating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">dari {totalCount} ulasan</span>
            </div>
          )}
        </div>
      </section>

      {/* Filter tabs */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                tab === t.id
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "text-muted-foreground border-border/20 hover:border-border/40 hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground text-sm">Belum ada testimoni di kategori ini.</div>
        ) : (
          <Reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((t) => (
              <div
                key={t.id}
                className="relative glass rounded-2xl p-6 border border-border/20 hover:border-primary/30 transition-all duration-300 group"
              >
                <Quote size={32} className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/15 transition-colors" fill="currentColor" />
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 relative z-10">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/20">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-xs font-bold shrink-0">
                    {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        )}
      </div>

      {/* Closing CTA */}
      <Reveal className="max-w-3xl mx-auto px-6 mt-16">
        <div className="relative glass rounded-3xl border border-primary/20 p-8 lg:p-10 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-accent/5" />
          <div className="relative z-10">
            <h2 className="text-xl font-black mb-2">Jadi bagian dari cerita berikutnya?</h2>
            <p className="text-sm text-muted-foreground mb-6">Mulai membership dan rasakan sendiri hasilnya.</p>
            <Button variant="hero" asChild>
              <Link href="/membership">
                Lihat Paket Membership <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
