"use server";

import { prisma } from "@/lib/prisma";
import { requireVerifiedUser } from "@/lib/authGuards";
import { createPaymentIntent } from "@/lib/paymentIntent";

export async function createClassBookingPaymentIntent(sessionId: string) {
  const session = await requireVerifiedUser(`/booking?sessionId=${sessionId}`);

  const classSession = await prisma.classSession.findUnique({ where: { id: sessionId } });
  if (!classSession) throw new Error("Sesi kelas tidak ditemukan.");

  return createPaymentIntent({
    userId: session.user.id,
    userName: session.user.name ?? "Member",
    userEmail: session.user.email ?? "",
    type: "CLASS_BOOKING",
    amount: classSession.price,
    payload: { sessionId },
  });
}
