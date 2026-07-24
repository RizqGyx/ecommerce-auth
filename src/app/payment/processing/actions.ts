"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { checkPaymentIntentStatus } from "@/lib/paymentIntent";

export async function pollPaymentIntent(intentId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const intent = await prisma.paymentIntent.findUnique({ where: { id: intentId } });
  if (!intent || intent.userId !== session.user.id) {
    throw new Error("Payment intent tidak ditemukan.");
  }

  return checkPaymentIntentStatus(intentId);
}
