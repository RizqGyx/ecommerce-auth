import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import SearchPageClient, { type SearchResults } from "./SearchPageClient";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return buildMetadata({
    title: q ? `Hasil pencarian: ${q}` : "Cari",
    description: "Cari kelas, coach, produk, dan artikel di S-One Gym Bukittinggi.",
    path: "/search",
  });
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  let results: SearchResults = { classes: [], coaches: [], products: [], posts: [] };

  if (query.length >= 2) {
    const [classes, coaches, products, posts] = await Promise.all([
      prisma.classType.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 8,
      }),
      prisma.coach.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { title: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 8,
      }),
      prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 8,
      }),
      prisma.blogPost.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { excerpt: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 8,
      }),
    ]);

    results = {
      classes: classes.map((c) => ({ id: c.id, title: c.name, desc: c.description, icon: c.icon ?? "🏋️", href: `/classes/${c.id}` })),
      coaches: coaches.map((c) => ({ id: c.id, title: c.name, desc: c.title, icon: c.name.split(" ").map((n) => n[0]).join("").slice(0, 2), href: `/coaches/${c.id}` })),
      products: products.map((p) => ({ id: p.id, title: p.name, desc: `Rp ${p.price.toLocaleString("id-ID")}`, icon: "🛍️", href: `/shop` })),
      posts: posts.map((p) => ({ id: p.id, title: p.title, desc: p.excerpt, icon: "📰", href: `/news/${p.slug}` })),
    };
  }

  return <SearchPageClient query={query} results={results} />;
}
