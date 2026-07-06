import Link from "next/link";
import { ArrowRight, Calendar, Tag, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { toBlogPostData } from "@/lib/serializers";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

const NewsPreviewSection = async () => {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 4,
  });
  const [featuredRow, ...sideRows] = posts;
  if (!featuredRow) return null;
  const featured = toBlogPostData(featuredRow);
  const stacked = sideRows.slice(0, 3).map(toBlogPostData);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">
              Latest News
            </span>
            <h2 className="text-4xl lg:text-5xl font-black">
              Stay <span className="gradient-text">Updated</span>
            </h2>
          </div>
          <Button variant="neon" size="sm" className="shrink-0 self-start md:self-auto" asChild>
            <Link href="/news">All Articles <ArrowRight size={16} className="ml-1" /></Link>
          </Button>
        </div>

        {/* Magazine layout — 2/3 + 1/3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Featured large article */}
          <Link
            href={`/news/${featured.slug}`}
            className="lg:col-span-2 group relative glass rounded-3xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 block"
          >
            {/* Placeholder image background */}
            <div className="relative h-72 lg:h-80 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary overflow-hidden">
              <div className="absolute inset-0 hologram-lines opacity-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

              {/* Category badge */}
              <div className="absolute top-5 left-5">
                <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground">
                  <Tag size={10} /> {featured.category}
                </span>
              </div>

              {/* Decorative number */}
              <div className="absolute -bottom-4 -right-4 text-[160px] font-black text-white/3 select-none leading-none">
                01
              </div>
            </div>

            <div className="p-7">
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1.5">
                  <Calendar size={11} /> {formatDate(featured.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={11} /> {featured.readTime} min read
                </span>
              </div>
              <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                {featured.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-5">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                Baca Selengkapnya <ArrowRight size={14} />
              </div>
            </div>
          </Link>

          {/* Right: 3 stacked mini articles */}
          <div className="flex flex-col gap-4">
            {stacked.map((post, idx) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className="group glass rounded-2xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex gap-4 p-4 items-start"
              >
                {/* Mini color block with article number */}
                <div className="shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center relative overflow-hidden border border-primary/10">
                  <span className="text-2xl font-black text-white/10 select-none">
                    0{idx + 2}
                  </span>
                  <span className="absolute text-xs font-bold text-primary">
                    {post.category?.slice(0, 3).toUpperCase()}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-1.5">
                    <Calendar size={9} /> {formatDate(post.publishedAt)}
                    <span>·</span>
                    <Clock size={9} /> {post.readTime}m
                  </div>
                  <h4 className="font-bold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h4>
                </div>
              </Link>
            ))}

            {/* Newsletter CTA */}
            <div className="relative overflow-hidden glass rounded-2xl border border-primary/20 p-5 bg-gradient-to-br from-primary/10 to-accent/5">
              <div className="absolute inset-0 hologram-lines opacity-10" />
              <div className="relative z-10">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Newsletter</p>
                <p className="font-black text-sm mb-1">Dapatkan tips fitness mingguan</p>
                <p className="text-xs text-muted-foreground mb-3">Langsung ke email kamu, gratis.</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="email@kamu.com"
                    className="flex-1 min-w-0 text-xs bg-background/50 border border-border/30 rounded-lg px-3 py-2 outline-none focus:border-primary/50"
                  />
                  <Button variant="neon" size="sm" className="text-xs px-3">
                    OK
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsPreviewSection;
