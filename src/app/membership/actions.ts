"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireVerifiedUser } from "@/lib/authGuards";

export async function subscribeToPlan(planId: string) {
  const session = await requireVerifiedUser("/membership");

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 30);

  const membership = await prisma.gymMembership.upsert({
    where: { userId: session.user.id },
    update: { planId, status: "ACTIVE", startDate, endDate },
    create: { userId: session.user.id, planId, status: "ACTIVE", startDate, endDate },
  });

  await prisma.memberCard.upsert({
    where: { userId: session.user.id },
    update: { membershipId: membership.id },
    create: { userId: session.user.id, membershipId: membership.id },
  });

  revalidatePath("/membership");
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
