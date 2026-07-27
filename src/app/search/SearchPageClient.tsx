"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search as SearchIcon, Dumbbell, Users, ShoppingBag, Newspaper, ArrowRight } from "lucide-react";
import Reveal from "@/components/atoms/Reveal";

interface ResultItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
  href: string;
}

export interface SearchResults {
  classes: ResultItem[];
  coaches: ResultItem[];
  products: ResultItem[];
  posts: ResultItem[];
}

const GROUPS: { key: keyof SearchResults; label: string; icon: typeof Dumbbell; accent: string }[] = [
  { key: "classes", label: "Kelas", icon: Dumbbell, accent: "text-primary bg-primary/10 border-primary/20" },
  { key: "coaches", label: "Coach", icon: Users, accent: "text-accent bg-accent/10 border-accent/20" },
  { key: "products", label: "Produk", icon: ShoppingBag, accent: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
  { key: "posts", label: "Artikel", icon: Newspaper, accent: "text-green-400 bg-green-400/10 border-green-400/20" },
];

export default function SearchPageClient({ query, results }: { query: string; results: SearchResults }) {
  const router = useRouter();
  const [input, setInput] = useState(query);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  };

  const totalResults = GROUPS.reduce((sum, g) => sum + results[g.key].length, 0);
  const hasSearched = query.length >= 2;

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero + search input */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/8" />
        <div className="absolute inset-0 hologram-lines opacity-10" />

        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
            Search
          </span>
          <h1 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">
            Cari apa yang <span className="gradient-text">kamu butuhkan.</span>
          </h1>

          <form onSubmit={handleSubmit} className="relative">
            <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Kelas, coach, produk, atau artikel..."
              className="w-full pl-12 pr-28 py-4 rounded-2xl bg-card border border-border/30 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Cari
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        {!hasSearched && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm">Ketik minimal 2 karakter untuk mulai mencari.</p>
          </div>
        )}

        {hasSearched && totalResults === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-4">
              <SearchIcon size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Tidak ada hasil untuk <span className="text-foreground font-semibold">&ldquo;{query}&rdquo;</span>
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">Coba kata kunci lain, mis. nama kelas atau coach.</p>
          </div>
        )}

        {hasSearched && totalResults > 0 && (
          <div className="space-y-10 pb-10">
            {GROUPS.map(({ key, label, icon: Icon, accent }) => {
              const items = results[key];
              if (items.length === 0) return null;
              return (
                <Reveal key={key}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${accent} flex items-center gap-1.5`}>
                      <Icon size={12} /> {label}
                    </span>
                    <span className="text-xs text-muted-foreground">{items.length} hasil</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="group glass rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 p-4 flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-secondary/60 flex items-center justify-center shrink-0 text-lg">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{item.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                        </div>
                        <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      </Link>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
