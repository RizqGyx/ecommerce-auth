import { prisma } from "@/lib/prisma";
import { toBlogPostData } from "@/lib/serializers";
import NewsPageClient from "./NewsPageClient";

export default async function NewsPage() {
  const postRows = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
  const posts = postRows.map(toBlogPostData);

  return <NewsPageClient posts={posts} />;
}
