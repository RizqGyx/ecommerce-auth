import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogPostForm from "../../BlogPostForm";
import { updateBlogPost } from "../../actions";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });

  if (!post) notFound();

  const updatePostWithId = updateBlogPost.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Edit Artikel</h1>
      <BlogPostForm action={updatePostWithId} post={post} />
    </div>
  );
}
