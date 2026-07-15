import { cache } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Tag, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { toBlogPostData } from "@/lib/serializers";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import BlogPostCard, { CATEGORY_EMOJI, CATEGORY_STYLES } from "@/components/molecules/BlogPostCard";

const getPost = cache((slug: string) => prisma.blogPost.findUnique({ where: { slug } }));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || !post.published) {
    return buildMetadata({ title: "Artikel Tidak Ditemukan", description: "Artikel yang kamu cari tidak tersedia.", path: `/news/${slug}` });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/news/${slug}`,
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postRow = await getPost(slug);
  if (!postRow || !postRow.published) notFound();
  const post = toBlogPostData(postRow);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}/Hero.png`,
    datePublished: postRow.publishedAt?.toISOString() ?? postRow.createdAt.toISOString(),
    dateModified: postRow.updatedAt.toISOString(),
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "S-One Gym Bukittinggi",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/Icon.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/news/${slug}` },
  };

  const allPosts = await prisma.blogPost.findMany({ where: { published: true } });
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const otherRelated = related.length < 2
    ? allPosts.filter((p) => p.slug !== post.slug && !related.includes(p)).slice(0, 3 - related.length)
    : [];

  const allRelated = [...related, ...otherRelated].slice(0, 3).map(toBlogPostData);

  const publishedLabel = new Date(post.publishedAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Split content into paragraphs by double newline
  const paragraphs = post.content
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  // Detect heading paragraphs (lines that start with a bolded tip like "Tip 1 —" or short lines ending with nothing long)
  const isHeading = (text: string) =>
    text.length < 80 && !text.endsWith(".") && !text.endsWith(",") && !text.startsWith("•");

  return (
    <div className="min-h-screen pt-20 pb-24 bg-[#0a0a0a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* ── ARTICLE HERO ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-accent/4 to-transparent" />
        <div className="absolute inset-0 hologram-lines opacity-8" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/news" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft size={14} /> Kembali ke News
            </Link>
            <ChevronRight size={12} className="text-border" />
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${CATEGORY_STYLES[post.category]}`}>
              {CATEGORY_EMOJI[post.category]} {post.category}
            </span>
          </div>

          {/* Category badge */}
          <div className="mb-5">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${CATEGORY_STYLES[post.category]}`}>
              <Tag size={10} /> {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-5xl font-black leading-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-8 border-b border-border/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-xs font-bold">
                {post.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div className="font-semibold text-foreground text-xs">{post.author}</div>
                <div className="text-[10px]">Penulis S-One</div>
              </div>
            </div>
            <div className="w-px h-6 bg-border/30 hidden sm:block" />
            <span className="flex items-center gap-1.5">
              <Calendar size={13} /> {publishedLabel}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> {post.readTime} menit baca
            </span>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ───────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
          {/* Main content */}
          <article>
            {paragraphs.length === 0 ? (
              <div className="glass rounded-2xl border border-border/20 p-8 text-center text-muted-foreground">
                <p>Konten artikel sedang disiapkan.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {paragraphs.map((para, i) => {
                  if (isHeading(para) && i !== 0) {
                    return (
                      <h2 key={i} className="text-xl font-black text-foreground pt-4 border-l-2 border-primary pl-4">
                        {para}
                      </h2>
                    );
                  }
                  return (
                    <p key={i} className="text-base text-muted-foreground leading-[1.85] tracking-wide">
                      {para}
                    </p>
                  );
                })}
              </div>
            )}

            {/* Pull quote */}
            <div className="my-10 relative glass rounded-2xl border border-primary/20 p-8 bg-primary/3">
              <div className="text-5xl font-black text-primary/20 leading-none mb-2 select-none">&ldquo;</div>
              <p className="text-lg font-semibold text-foreground leading-relaxed italic">
                {post.excerpt}
              </p>
              <div className="mt-4 text-sm text-primary font-bold">— {post.author}</div>
            </div>

            {/* Share / actions */}
            <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-border/20 mt-10">
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">Bagikan artikel ini</span>
              {["WhatsApp", "Instagram", "Copy Link"].map((platform) => (
                <button
                  key={platform}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border border-border/30 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-200 cursor-pointer"
                >
                  {platform}
                </button>
              ))}
            </div>

            {/* Author card */}
            <div className="mt-10 glass rounded-2xl border border-border/20 p-6 flex gap-5 items-start">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-lg font-black shrink-0">
                {post.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-black text-base">{post.author}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${CATEGORY_STYLES[post.category]}`}>
                    {post.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Coach & kontributor konten di S-One Gym. Spesialisasi dalam nutrisi olahraga, program latihan berbasis bukti, dan pengembangan komunitas fitness.
                </p>
              </div>
            </div>
          </article>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              {/* Article info */}
              <div className="glass rounded-2xl border border-border/20 p-5">
                <p className="text-xs font-black tracking-widest uppercase text-muted-foreground mb-4">Info Artikel</p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1.5"><User size={11} /> Penulis</span>
                    <span className="font-semibold text-xs text-right">{post.author}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1.5"><Calendar size={11} /> Tanggal</span>
                    <span className="font-semibold text-xs">{publishedLabel}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1.5"><Clock size={11} /> Baca</span>
                    <span className="font-semibold text-xs">{post.readTime} menit</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1.5"><Tag size={11} /> Kategori</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${CATEGORY_STYLES[post.category]}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="glass rounded-2xl border border-primary/20 p-5 bg-primary/5">
                <p className="text-xs font-black tracking-widest uppercase text-primary mb-2">Mulai Sekarang</p>
                <p className="text-sm font-semibold mb-4">Tertarik menerapkan tips ini bersama coach kami?</p>
                <Button variant="hero" size="sm" className="w-full" asChild>
                  <Link href="/schedule">Book Kelas <ArrowRight size={13} /></Link>
                </Button>
                <Button variant="neon" size="sm" className="w-full mt-2" asChild>
                  <Link href="/personal-trainer">Konsultasi PT</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── RELATED ARTICLES ───────────────────────────────────────────────────── */}
      {allRelated.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-border/20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-primary mb-2 block">Baca Juga</span>
              <h2 className="text-2xl font-black">Artikel <span className="gradient-text">Terkait</span></h2>
            </div>
            <Link href="/news" className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-semibold transition-colors">
              Semua artikel <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {allRelated.map((p) => (
              <BlogPostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA ─────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="relative glass rounded-2xl border border-primary/20 p-8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
          <div className="relative z-10">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">S-One Gym</p>
            <h3 className="text-xl font-black mb-3">Siap Mulai Perjalanan Fitnesmu?</h3>
            <p className="text-sm text-muted-foreground mb-6">Bergabunglah bersama 2,000+ member aktif di Bukittinggi.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" asChild>
                <Link href="/membership">Lihat Paket Membership <ArrowRight size={14} /></Link>
              </Button>
              <Button variant="neon" asChild>
                <Link href="/schedule">Book Kelas Gratis</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
