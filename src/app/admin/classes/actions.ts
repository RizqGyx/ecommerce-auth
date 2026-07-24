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

const classTypeSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung"),
  description: z.string().min(1),
  duration: z.coerce.number().int().min(1),
  color: z.string().optional().or(z.literal("")),
  colorSolid: z.string().optional().or(z.literal("")),
  icon: z.string().optional().or(z.literal("")),
  benefits: z.string(),
});

function parseClassTypeForm(formData: FormData) {
  const parsed = classTypeSchema.parse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    duration: formData.get("duration"),
    color: formData.get("color") ?? "",
    colorSolid: formData.get("colorSolid") ?? "",
    icon: formData.get("icon") ?? "",
    benefits: formData.get("benefits") ?? "",
  });

  return {
    name: parsed.name,
    slug: parsed.slug,
    description: parsed.description,
    duration: parsed.duration,
    color: parsed.color === "" ? null : parsed.color,
    colorSolid: parsed.colorSolid === "" ? null : parsed.colorSolid,
    icon: parsed.icon === "" ? null : parsed.icon,
    benefits: parsed.benefits
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean),
  };
}

export async function createClassType(formData: FormData) {
  await requireAdmin();
  const data = parseClassTypeForm(formData);

  await prisma.classType.create({ data });

  revalidatePath("/admin/classes");
  revalidatePath("/classes");
  redirect("/admin/classes");
}

export async function updateClassType(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseClassTypeForm(formData);

  await prisma.classType.update({ where: { id }, data });

  revalidatePath("/admin/classes");
  revalidatePath("/classes");
  redirect("/admin/classes");
}

export async function deleteClassType(id: string) {
  await requireAdmin();
  try {
    await prisma.classType.delete({ where: { id } });
  } catch {
    throw new Error("Tidak bisa menghapus kelas ini karena masih punya jadwal sesi terkait.");
  }
  revalidatePath("/admin/classes");
  revalidatePath("/classes");
}
