"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session.user;
}

const postSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung"),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().optional().or(z.literal("")),
  authorName: z.string().min(2),
  readTime: z.coerce.number().int().min(1),
  category: z.enum(["NEWS", "TIPS", "NUTRITION", "WORKOUT", "EVENTS"]),
  published: z.string().optional(),
  featured: z.string().optional(),
});

function parsePostForm(formData: FormData) {
  const parsed = postSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    imageUrl: formData.get("imageUrl") ?? "",
    authorName: formData.get("authorName"),
    readTime: formData.get("readTime"),
    category: formData.get("category"),
    published: formData.get("published") ?? undefined,
    featured: formData.get("featured") ?? undefined,
  });

  return {
    title: parsed.title,
    slug: parsed.slug,
    excerpt: parsed.excerpt,
    content: parsed.content,
    imageUrl: parsed.imageUrl === "" ? null : parsed.imageUrl,
    authorName: parsed.authorName,
    readTime: parsed.readTime,
    category: parsed.category,
    published: parsed.published === "on",
    featured: parsed.featured === "on",
  };
}

export async function createBlogPost(formData: FormData) {
  const admin = await requireAdmin();
  const data = parsePostForm(formData);

  await prisma.blogPost.create({
    data: { ...data, authorId: admin.id, publishedAt: data.published ? new Date() : null },
  });

  revalidatePath("/admin/blog-posts");
  revalidatePath("/news");
  redirect("/admin/blog-posts");
}

export async function updateBlogPost(id: string, formData: FormData) {
  await requireAdmin();
  const data = parsePostForm(formData);

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  const publishedAt = data.published ? existing?.publishedAt ?? new Date() : existing?.publishedAt ?? null;

  await prisma.blogPost.update({ where: { id }, data: { ...data, publishedAt } });

  revalidatePath("/admin/blog-posts");
  revalidatePath("/news");
  revalidatePath(`/news/${data.slug}`);
  redirect("/admin/blog-posts");
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog-posts");
  revalidatePath("/news");
}
