import { prisma } from "@/lib/prisma";
import { toBlogPostData } from "@/lib/serializers";
import { buildMetadata } from "@/lib/seo";
import NewsPageClient from "./NewsPageClient";

export const metadata = buildMetadata({
  title: "Blog & Tips Fitness",
  description:
    "Artikel seputar tips latihan, nutrisi, dan kabar terbaru dari S-One Gym Bukittinggi — ditulis oleh coach berpengalaman.",
  path: "/news",
});

export default async function NewsPage() {
  const postRows = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
  const posts = postRows.map(toBlogPostData);

  return <NewsPageClient posts={posts} />;
}
