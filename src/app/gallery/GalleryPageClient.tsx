"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/atoms/Reveal";

export interface GalleryItem {
  id: string;
  category: "facility" | "class" | "coach";
  icon: string;
  title: string;
  desc: string;
  size: "large" | "medium" | "small";
  color: string;
  href?: string;
}

const TABS: { id: "all" | GalleryItem["category"]; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "facility", label: "Fasilitas" },
  { id: "class", label: "Kelas" },
  { id: "coach", label: "Coach" },
];

const SIZE_CLASS: Record<GalleryItem["size"], string> = {
  large: "row-span-2 md:col-span-2",
  medium: "row-span-1",
  small: "row-span-1",
};

function Tile({ item }: { item: GalleryItem }) {
  const isCoach = item.category === "coach";

  const content = (
    <div
      className={`group relative h-full glass rounded-2xl border border-border/20 p-5 flex flex-col justify-end overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 ${SIZE_CLASS[item.size]}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />
      <div className="relative z-10">
        {isCoach ? (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-muted border border-border/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
            <span className="font-black text-sm gradient-text">{item.icon}</span>
          </div>
        ) : (
          <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform duration-300">
            {item.icon}
          </span>
        )}
        <h3 className="font-bold text-sm mb-1">{item.title}</h3>
        <p className={`text-xs text-muted-foreground leading-relaxed ${item.size === "small" ? "line-clamp-1" : "line-clamp-2"}`}>
          {item.desc}
        </p>
        {item.href && (
          <div className="flex items-center gap-1 text-[11px] font-semibold text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Lihat detail <ArrowRight size={10} />
          </div>
        )}
      </div>
    </div>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="block h-full">
        {content}
      </Link>
    );
  }
  return content;
}

export default function GalleryPageClient({ items }: { items: GalleryItem[] }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("all");
  const filtered = tab === "all" ? items : items.filter((i) => i.category === tab);

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-background to-primary/8" />
        <div className="absolute inset-0 hologram-lines opacity-10" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
            Take a Look Inside
          </span>
          <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
            Ruang, Kelas, dan <span className="gradient-text">Orang di Baliknya.</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            1,500m² fasilitas, enam program kelas, dan tim coach bersertifikat — semua yang membuat
            S-One terasa berbeda dari gym lainnya di Bukittinggi.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap gap-2">
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

      {/* Gallery grid */}
      <Reveal className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px]">
          {filtered.map((item) => (
            <Tile key={item.id} item={item} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">Belum ada item di kategori ini.</div>
        )}
      </Reveal>
    </div>
  );
}
