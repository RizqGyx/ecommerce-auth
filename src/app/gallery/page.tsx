import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import { FACILITIES } from "@/lib/data";
import GalleryPageClient, { type GalleryItem } from "./GalleryPageClient";

export const metadata = buildMetadata({
  title: "Galeri",
  description:
    "Jelajahi fasilitas, kelas, dan tim coach S-One Gym Bukittinggi — semua yang membuat gym ini terasa berbeda.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const [classTypes, coaches] = await Promise.all([
    prisma.classType.findMany({ orderBy: { name: "asc" } }),
    prisma.coach.findMany({ orderBy: { name: "asc" }, take: 8 }),
  ]);

  const items: GalleryItem[] = [
    ...FACILITIES.map((f, i) => ({
      id: `facility-${i}`,
      category: "facility" as const,
      icon: f.icon,
      title: f.name,
      desc: f.desc,
      size: f.size as "large" | "medium" | "small",
      color: "from-primary/25 to-primary/5",
    })),
    ...classTypes.map((c, i) => ({
      id: `class-${c.id}`,
      category: "class" as const,
      icon: c.icon ?? "🏋️",
      title: c.name,
      desc: c.description,
      size: (i % 4 === 0 ? "large" : "medium") as "large" | "medium" | "small",
      color: c.color ?? "from-accent/25 to-accent/5",
      href: `/classes/${c.id}`,
    })),
    ...coaches.map((c) => ({
      id: `coach-${c.id}`,
      category: "coach" as const,
      icon: c.name.split(" ").map((n) => n[0]).join("").slice(0, 2),
      title: c.name,
      desc: c.title,
      size: "small" as const,
      color: "from-accent/25 to-primary/10",
      href: `/coaches/${c.id}`,
    })),
  ];

  return <GalleryPageClient items={items} />;
}
