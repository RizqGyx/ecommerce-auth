"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

export async function markPtSessionComplete(bookingId: string) {
  await requireAdmin();

  const booking = await prisma.pTBooking.findUnique({ where: { id: bookingId } });
  if (!booking) throw new Error("Booking PT tidak ditemukan.");
  if (booking.sessionsUsed >= booking.sessionsTotal) return;

  const sessionsUsed = booking.sessionsUsed + 1;
  await prisma.pTBooking.update({
    where: { id: bookingId },
    data: {
      sessionsUsed,
      status: sessionsUsed >= booking.sessionsTotal ? "COMPLETED" : booking.status,
    },
  });

  revalidatePath("/admin/pt-bookings");
}
