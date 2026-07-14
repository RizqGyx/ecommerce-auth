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

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(1),
  price: z.coerce.number().int().min(0),
  originalPrice: z.coerce.number().int().min(0).optional().or(z.literal("")),
  imageUrl: z.string().optional().or(z.literal("")),
  rating: z.coerce.number().min(0).max(5),
  reviewsCount: z.coerce.number().int().min(0),
  badge: z.string().optional().or(z.literal("")),
  categoryId: z.string().min(1),
});

function parseProductForm(formData: FormData) {
  const parsed = productSchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    originalPrice: formData.get("originalPrice") ?? "",
    imageUrl: formData.get("imageUrl") ?? "",
    rating: formData.get("rating"),
    reviewsCount: formData.get("reviewsCount"),
    badge: formData.get("badge") ?? "",
    categoryId: formData.get("categoryId"),
  });

  return {
    name: parsed.name,
    description: parsed.description,
    price: parsed.price,
    originalPrice: parsed.originalPrice === "" ? null : Number(parsed.originalPrice),
    imageUrl: parsed.imageUrl === "" ? null : parsed.imageUrl,
    rating: parsed.rating,
    reviewsCount: parsed.reviewsCount,
    badge: parsed.badge === "" ? null : parsed.badge,
    categoryId: parsed.categoryId,
  };
}

export async function createProduct(formData: FormData) {
  const admin = await requireAdmin();
  const data = parseProductForm(formData);

  await prisma.product.create({
    data: { ...data, userId: admin.id },
  });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseProductForm(formData);

  await prisma.product.update({ where: { id }, data });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}
