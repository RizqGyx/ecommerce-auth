"use server";

import { revalidatePath } from "next/cache";
import { compare, hash } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/authGuards";

export async function updateProfile(name: string, phone: string) {
  const session = await requireUser("/settings");

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name, phone },
  });

  revalidatePath("/settings");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteAccount() {
  const session = await requireUser("/settings");
  await prisma.user.delete({ where: { id: session.user.id } });
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const session = await requireUser("/settings");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user?.password) return { success: false, error: "Akun ini tidak menggunakan password (login via Google)." };

  const valid = await compare(currentPassword, user.password);
  if (!valid) return { success: false, error: "Password saat ini salah." };

  const hashedPassword = await hash(newPassword, 10);
  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashedPassword },
  });

  return { success: true };
}
