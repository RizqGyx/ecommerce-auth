"use server";

import { prisma } from "@/lib/prisma";
import { requireVerifiedUser } from "@/lib/authGuards";
import { createNotification } from "@/lib/notifications";

export async function confirmClassBooking(sessionId: string) {
  const session = await requireVerifiedUser(`/booking?sessionId=${sessionId}`);

  const classSession = await prisma.classSession.findUnique({
    where: { id: sessionId },
    include: { classType: true, coach: true },
  });
  if (!classSession) throw new Error("Sesi kelas tidak ditemukan.");

  const registration = await prisma.classRegistration.upsert({
    where: { userId_sessionId: { userId: session.user.id, sessionId } },
    update: {},
    create: { userId: session.user.id, sessionId },
  });

  const dateLabel = classSession.date.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" });
  await createNotification(prisma, {
    userId: session.user.id,
    type: "BOOKING",
    sourceId: registration.id,
    title: "Booking Dikonfirmasi",
    body: `Kelas ${classSession.classType.name} bersama ${classSession.coach.name}, ${dateLabel} pukul ${classSession.startTime} berhasil dikonfirmasi.`,
    actionUrl: "/schedule",
  });
}
