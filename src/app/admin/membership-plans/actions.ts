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
}

const planSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung"),
  price: z.coerce.number().int().min(0),
  description: z.string().min(1),
  features: z.string(),
  popular: z.string().optional(),
  color: z.string().optional().or(z.literal("")),
  borderColor: z.string().optional().or(z.literal("")),
});

// Each line: "+ Feature text" (included) or "- Feature text" (not included)
function parseFeatures(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const included = !line.startsWith("-");
      const text = line.replace(/^[+-]\s*/, "");
      return { text, included };
    });
}

function parsePlanForm(formData: FormData) {
  const parsed = planSchema.parse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    price: formData.get("price"),
    description: formData.get("description"),
    features: formData.get("features") ?? "",
    popular: formData.get("popular") ?? undefined,
    color: formData.get("color") ?? "",
    borderColor: formData.get("borderColor") ?? "",
  });

  return {
    name: parsed.name,
    slug: parsed.slug,
    price: parsed.price,
    description: parsed.description,
    features: parseFeatures(parsed.features),
    popular: parsed.popular === "on",
    color: parsed.color === "" ? null : parsed.color,
    borderColor: parsed.borderColor === "" ? null : parsed.borderColor,
  };
}

export async function createMembershipPlan(formData: FormData) {
  await requireAdmin();
  const data = parsePlanForm(formData);

  await prisma.membershipPlan.create({ data });

  revalidatePath("/admin/membership-plans");
  revalidatePath("/membership");
  revalidatePath("/");
  redirect("/admin/membership-plans");
}

export async function updateMembershipPlan(id: string, formData: FormData) {
  await requireAdmin();
  const data = parsePlanForm(formData);

  await prisma.membershipPlan.update({ where: { id }, data });

  revalidatePath("/admin/membership-plans");
  revalidatePath("/membership");
  revalidatePath("/");
  redirect("/admin/membership-plans");
}

export async function deleteMembershipPlan(id: string) {
  await requireAdmin();
  try {
    await prisma.membershipPlan.delete({ where: { id } });
  } catch {
    throw new Error("Tidak bisa menghapus paket ini karena masih ada member yang berlangganan.");
  }
  revalidatePath("/admin/membership-plans");
  revalidatePath("/membership");
  revalidatePath("/");
}
