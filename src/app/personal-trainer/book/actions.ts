"use server";

import { prisma } from "@/lib/prisma";
import { requireVerifiedUser } from "@/lib/authGuards";
import { createPaymentIntent } from "@/lib/paymentIntent";
import { PT_PACKAGES } from "@/lib/data";

export async function createPtBookingPaymentIntent(coachId: string, packageId: string) {
  const session = await requireVerifiedUser("/personal-trainer/book");

  const pkg = PT_PACKAGES.find((p) => p.id === packageId);
  if (!pkg) throw new Error("Paket tidak ditemukan.");

  const coach = await prisma.coach.findUnique({ where: { id: coachId } });
  if (!coach) throw new Error("Trainer tidak ditemukan.");

  return createPaymentIntent({
    userId: session.user.id,
    userName: session.user.name ?? "Member",
    userEmail: session.user.email ?? "",
    type: "PT_BOOKING",
    amount: pkg.price,
    payload: { coachId, packageId },
  });
}
