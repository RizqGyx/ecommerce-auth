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

const coachSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung"),
  title: z.string().min(2),
  bio: z.string().min(1),
  imageUrl: z.string().min(1),
  specialties: z.string(),
  certifications: z.string(),
  experience: z.coerce.number().int().min(0),
  instagram: z.string().optional().or(z.literal("")),
  achievements: z.string().optional().or(z.literal("")),
  pricePerSession: z.coerce.number().int().min(0).optional().or(z.literal("")),
  featured: z.string().optional(),
  isPersonalTrainer: z.string().optional(),
});

function toLines(value: string) {
  return value.split("\n").map((v) => v.trim()).filter(Boolean);
}

function parseCoachForm(formData: FormData) {
  const parsed = coachSchema.parse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    title: formData.get("title"),
    bio: formData.get("bio"),
    imageUrl: formData.get("imageUrl"),
    specialties: formData.get("specialties") ?? "",
    certifications: formData.get("certifications") ?? "",
    experience: formData.get("experience"),
    instagram: formData.get("instagram") ?? "",
    achievements: formData.get("achievements") ?? "",
    pricePerSession: formData.get("pricePerSession") ?? "",
    featured: formData.get("featured") ?? undefined,
    isPersonalTrainer: formData.get("isPersonalTrainer") ?? undefined,
  });

  return {
    name: parsed.name,
    slug: parsed.slug,
    title: parsed.title,
    bio: parsed.bio,
    imageUrl: parsed.imageUrl,
    specialties: toLines(parsed.specialties),
    certifications: toLines(parsed.certifications),
    experience: parsed.experience,
    instagram: parsed.instagram === "" ? null : parsed.instagram,
    achievements: parsed.achievements === "" ? null : parsed.achievements,
    pricePerSession: parsed.pricePerSession === "" ? null : Number(parsed.pricePerSession),
    featured: parsed.featured === "on",
    isPersonalTrainer: parsed.isPersonalTrainer === "on",
  };
}

export async function createCoach(formData: FormData) {
  await requireAdmin();
  const data = parseCoachForm(formData);

  await prisma.coach.create({ data });

  revalidatePath("/admin/coaches");
  revalidatePath("/coaches");
  revalidatePath("/personal-trainer");
  redirect("/admin/coaches");
}

export async function updateCoach(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseCoachForm(formData);

  await prisma.coach.update({ where: { id }, data });

  revalidatePath("/admin/coaches");
  revalidatePath("/coaches");
  revalidatePath("/personal-trainer");
  redirect("/admin/coaches");
}

export async function deleteCoach(id: string) {
  await requireAdmin();
  try {
    await prisma.coach.delete({ where: { id } });
  } catch {
    throw new Error("Tidak bisa menghapus coach ini karena masih punya jadwal sesi terkait.");
  }
  revalidatePath("/admin/coaches");
  revalidatePath("/coaches");
  revalidatePath("/personal-trainer");
}
