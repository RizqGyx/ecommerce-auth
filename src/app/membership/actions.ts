"use server";

import { prisma } from "@/lib/prisma";
import { requireVerifiedUser } from "@/lib/authGuards";
import { createPaymentIntent } from "@/lib/paymentIntent";

export async function createMembershipPaymentIntent(planId: string, months: number) {
  const session = await requireVerifiedUser("/membership");

  const plan = await prisma.membershipPlan.findUnique({ where: { id: planId } });
  if (!plan) throw new Error("Paket membership tidak ditemukan.");

  const existing = await prisma.gymMembership.findUnique({ where: { userId: session.user.id } });
  if (existing && existing.status === "ACTIVE" && existing.endDate > new Date()) {
    const until = existing.endDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    throw new Error(`Membership kamu masih aktif hingga ${until}. Tidak bisa membeli paket baru sebelum itu berakhir.`);
  }

  return createPaymentIntent({
    userId: session.user.id,
    userName: session.user.name ?? "Member",
    userEmail: session.user.email ?? "",
    type: "MEMBERSHIP",
    amount: plan.price * months,
    payload: { planId, months },
  });
}
