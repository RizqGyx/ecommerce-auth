"use server";

import { prisma } from "@/lib/prisma";
import { requireVerifiedUser } from "@/lib/authGuards";
import { createNotification } from "@/lib/notifications";
import { PT_PACKAGES } from "@/lib/data";

export async function confirmPtBooking(coachId: string, packageId: string) {
  const session = await requireVerifiedUser("/personal-trainer/book");

  const pkg = PT_PACKAGES.find((p) => p.id === packageId);
  if (!pkg) throw new Error("Paket tidak ditemukan.");

  const coach = await prisma.coach.findUnique({ where: { id: coachId } });
  if (!coach) throw new Error("Trainer tidak ditemukan.");

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + pkg.validDays);

  const booking = await prisma.pTBooking.create({
    data: {
      userId: session.user.id,
      coachId,
      packageName: pkg.name,
      sessionsTotal: pkg.sessions,
      price: pkg.price,
      startDate,
      endDate,
    },
  });

  await createNotification(prisma, {
    userId: session.user.id,
    type: "PT",
    sourceId: booking.id,
    title: "Paket PT Aktif",
    body: `Paket ${pkg.name} bersama ${coach.name} telah aktif. Selamat berlatih!`,
    actionUrl: "/dashboard",
  });

  return { id: booking.id };
}
