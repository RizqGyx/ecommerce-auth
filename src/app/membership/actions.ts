"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function subscribeToPlan(planId: string) {
  const session = await auth();
  if (!session?.user) redirect(`/login?callbackUrl=/membership`);

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 30);

  await prisma.gymMembership.upsert({
    where: { userId: session.user.id },
    update: { planId, status: "ACTIVE", startDate, endDate },
    create: { userId: session.user.id, planId, status: "ACTIVE", startDate, endDate },
  });

  revalidatePath("/membership");
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
