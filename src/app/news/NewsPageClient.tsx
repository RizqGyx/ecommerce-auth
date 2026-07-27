"use client";

import { useState } from "react";
import { Search, Mail, BookOpen, TrendingUp } from "lucide-react";
import BlogPostCard, { CATEGORY_EMOJI, CATEGORY_STYLES, CATEGORY_LABELS } from "@/components/molecules/BlogPostCard";
import type { toBlogPostData } from "@/lib/serializers";
import Reveal from "@/components/atoms/Reveal";

const CATEGORIES = ["All", "NEWS", "TIPS", "NUTRITION", "WORKOUT", "EVENTS"];

function categoryLabel(cat: string) {
  return cat === "All" ? "Semua" : CATEGORY_LABELS[cat] ?? cat;
}

const POPULAR_TAGS = ["Nutrisi", "Pemulihan", "Kekuatan", "Kardio", "Mindset", "Suplemen", "Tips Pemula"];

type BlogPostData = ReturnType<typeof toBlogPostData>;

export default function NewsPageClient({ posts: BLOG_POSTS }: { posts: BlogPostData[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const CATEGORY_COUNT: Record<string, number> = {
    All: BLOG_POSTS.length,
    NEWS: BLOG_POSTS.filter((p) => p.category === "NEWS").length,
    TIPS: BLOG_POSTS.filter((p) => p.category === "TIPS").length,
    NUTRITION: BLOG_POSTS.filter((p) => p.category === "NUTRITION").length,
    WORKOUT: BLOG_POSTS.filter((p) => p.category === "WORKOUT").length,
    EVENTS: BLOG_POSTS.filter((p) => p.category === "EVENTS").length,
  };

  const filtered = BLOG_POSTS.filter(
    (p) =>
      (activeCategory === "All" || p.category === activeCategory) &&
      (search === "" || p.title.toLowerCase().includes(search.toLowerCase()))
  );

  const featured = BLOG_POSTS.find((p) => p.featured);
  const isUnfiltered = activeCategory === "All" && search === "";

  // Posts to show in grid (exclude featured when on unfiltered view)
  const gridPosts = filtered.filter((p) => !p.featured || !isUnfiltered);

  // Stagger sizes: first post in each filtered group gets wide card
  const getColSpan = (index: number) => {
    if (activeCategory !== "All") {
      // Masonry-ish: 0 → wide, 1 → normal, 2 → normal, 3 → wide, etc.
      if (index % 3 === 0) return "md:col-span-2";
    }
    // Default grid: first card always wide
    if (index === 0) return "md:col-span-2";
    return "";
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* ─── Magazine Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-24">
        <div className="absolute inset-0 hologram-lines opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />

        {/* Giant decorative quote */}
        <div className="absolute -top-8 left-4 text-[18rem] font-black text-primary/4 leading-none select-none pointer-events-none">
          &ldquo;
        </div>

        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Masthead */}
          <div className="mb-2">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary/60">
              Est. 2025 &bull; S-One Gym Media
            </span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black leading-none mb-4">
            S-One <span className="gradient-text">Journal</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed mb-8">
            Insight fitness, cerita member, sains nutrisi, dan berita komunitas S-One —
            semua dikurasi oleh coach dan staf kami.
          </p>

          {/* Stats + category badges row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 glass rounded-xl px-4 py-2 border border-border/20">
              <BookOpen size={14} className="text-primary" />
              <span className="text-sm font-semibold">{BLOG_POSTS.length} Artikel</span>
            </div>
            <div className="flex items-center gap-2 glass rounded-xl px-4 py-2 border border-border/20">
              <TrendingUp size={14} className="text-primary" />
              <span className="text-sm font-semibold">5 Kategori</span>
            </div>
            <div className="w-px h-6 bg-border/30 hidden sm:block" />
            {["NEWS", "TIPS", "NUTRITION"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${CATEGORY_STYLES[cat]}`}
              >
                {CATEGORY_EMOJI[cat]} {categoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Article ────────────────────────────────────────────────── */}
      {featured && isUnfiltered && (
        <Reveal><section className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-primary to-accent" />
            <h2 className="text-sm font-black tracking-widest uppercase text-muted-foreground">
              Artikel Unggulan
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Featured post — takes 2/3 */}
            <div className="lg:col-span-2">
              <BlogPostCard post={featured} variant="featured" showFeaturedBadge />
            </div>

            {/* Sidebar: stats + popular tags */}
            <div className="flex flex-col gap-4">
              {/* Reading stats */}
              <div className="glass rounded-2xl border border-border/20 p-5">
                <p className="text-xs font-black tracking-widest uppercase text-muted-foreground mb-4">
                  Statistik Singkat
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Total Artikel", value: BLOG_POSTS.length, icon: "📝" },
                    { label: "Rata-rata Baca", value: `${Math.round(BLOG_POSTS.reduce((a, b) => a + b.readTime, 0) / BLOG_POSTS.length)} menit`, icon: "⏱️" },
                    { label: "Penulis", value: [...new Set(BLOG_POSTS.map((p) => p.author))].length, icon: "✍️" },
                    { label: "Kategori", value: 5, icon: "🏷️" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{stat.icon}</span> {stat.label}
                      </span>
                      <span className="text-sm font-bold text-foreground">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular tags */}
              <div className="glass rounded-2xl border border-border/20 p-5">
                <p className="text-xs font-black tracking-widest uppercase text-muted-foreground mb-4">
                  Topik Populer
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full glass border border-border/20 text-muted-foreground hover:border-primary/30 hover:text-primary cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section></Reveal>
      )}

      {/* ─── Category Tab Bar ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-border/20 w-full sm:w-auto gap-0">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative shrink-0 flex items-center gap-1.5 px-4 py-3 text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat !== "All" && <span>{CATEGORY_EMOJI[cat]}</span>}
                  {categoryLabel(cat)}
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ml-0.5 ${
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    {CATEGORY_COUNT[cat]}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative flex-1 sm:max-w-xs ml-auto">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Cari artikel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border/30 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ─── Article Grid ────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pt-6 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <div className="text-4xl mb-4">📭</div>
            <p>Tidak ada artikel ditemukan.</p>
          </div>
        ) : (
          <>
            {gridPosts.length > 0 && (
              <div
                className={`grid gap-6 ${
                  activeCategory !== "All"
                    ? "grid-cols-1 md:grid-cols-3"
                    : "grid-cols-1 md:grid-cols-3"
                }`}
              >
                {gridPosts.map((post, i) => (
                  <BlogPostCard
                    key={post.id}
                    post={post}
                    className={getColSpan(i)}
                  />
                ))}
              </div>
            )}
            {isUnfiltered && gridPosts.length === 0 && (
              <p className="text-center py-10 text-muted-foreground text-sm">
                Semua artikel sudah ditampilkan di bagian unggulan di atas.
              </p>
            )}
          </>
        )}
      </section>

      {/* ─── Newsletter Banner ───────────────────────────────────────────────── */}
      <Reveal><section className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-[#0a0a0a] to-accent/10 px-8 py-14">
          {/* Background texture */}
          <div className="absolute inset-0 hologram-lines opacity-10 rounded-3xl" />

          {/* Glow */}
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary mb-4 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5">
                <Mail size={11} /> Newsletter Mingguan
              </div>
              <h2 className="text-3xl lg:text-4xl font-black mb-3">
                Tetap <span className="gradient-text">Selangkah di Depan</span>
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed">
                Dapatkan tips fitness terbaru, panduan nutrisi, update kelas, dan penawaran
                eksklusif member — langsung ke inbox kamu setiap minggu.
              </p>
            </div>

            {/* Right — form */}
            <div className="w-full lg:w-auto lg:min-w-80">
              {subscribed ? (
                <div className="glass rounded-2xl border border-primary/30 px-6 py-8 text-center">
                  <div className="text-3xl mb-3">🎉</div>
                  <p className="font-bold text-primary text-sm">Kamu sudah berlangganan!</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Cek inbox untuk email selamat datang.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="glass rounded-2xl border border-border/20 p-5 flex flex-col gap-3"
                >
                  <input
                    type="email"
                    placeholder="Masukkan alamat emailmu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity"
                  >
                    Langganan Gratis
                  </button>
                  <p className="text-[10px] text-center text-muted-foreground">
                    Tanpa spam. Berhenti berlangganan kapan saja.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section></Reveal>
    </div>
  );
}
