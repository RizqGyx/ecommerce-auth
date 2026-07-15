import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/seo";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/classes", priority: 0.9, changeFrequency: "weekly" },
  { path: "/coaches", priority: 0.8, changeFrequency: "weekly" },
  { path: "/membership", priority: 0.9, changeFrequency: "weekly" },
  { path: "/news", priority: 0.7, changeFrequency: "daily" },
  { path: "/personal-trainer", priority: 0.8, changeFrequency: "weekly" },
  { path: "/schedule", priority: 0.8, changeFrequency: "daily" },
  { path: "/shop", priority: 0.8, changeFrequency: "weekly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [classTypes, coaches, posts] = await Promise.all([
    prisma.classType.findMany({ select: { id: true, updatedAt: true } }),
    prisma.coach.findMany({ select: { id: true, updatedAt: true } }),
    prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const classEntries: MetadataRoute.Sitemap = classTypes.map((c) => ({
    url: `${SITE_URL}/classes/${c.id}`,
    lastModified: c.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const coachEntries: MetadataRoute.Sitemap = coaches.map((c) => ({
    url: `${SITE_URL}/coaches/${c.id}`,
    lastModified: c.updatedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const newsEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/news/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...classEntries, ...coachEntries, ...newsEntries];
}
