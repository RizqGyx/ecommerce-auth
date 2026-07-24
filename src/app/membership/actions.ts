"use server";

import { prisma } from "@/lib/prisma";
import { requireVerifiedUser } from "@/lib/authGuards";
import { createPaymentIntent } from "@/lib/paymentIntent";

export async function createMembershipPaymentIntent(planId: string, months: number) {
  const session = await requireVerifiedUser("/membership");

  const plan = await prisma.membershipPlan.findUnique({ where: { id: planId } });
  if (!plan) throw new Error("Paket membership tidak ditemukan.");

  return createPaymentIntent({
    userId: session.user.id,
    userName: session.user.name ?? "Member",
    userEmail: session.user.email ?? "",
    type: "MEMBERSHIP",
    amount: plan.price * months,
    payload: { planId, months },
  });
}
