import { prisma } from "@/lib/prisma";
import { createNotification, sessionEndInstant } from "@/lib/notifications";

/**
 * Lazily flips REGISTERED class registrations to ATTENDED once the class's
 * end time has passed, and returns attended-but-not-yet-reviewed registrations.
 * This is the only place the ATTENDED transition runs (called once per dashboard
 * visit) — there's no cron in this deployment, so a user who never revisits
 * /dashboard after a class won't be flipped/notified until they do.
 */
export async function getUnreviewedClassPrompts(userId: string) {
  const now = new Date();

  const candidates = await prisma.classRegistration.findMany({
    where: { userId, status: "REGISTERED", session: { date: { lte: now } } },
    include: { session: { include: { classType: true, coach: true } } },
  });
  const toFlip = candidates.filter((c) => sessionEndInstant(c.session) < now);

  if (toFlip.length > 0) {
    await prisma.classRegistration.updateMany({
      where: { id: { in: toFlip.map((c) => c.id) } },
      data: { status: "ATTENDED" },
    });

    await Promise.all(
      toFlip.map((c) =>
        createNotification(prisma, {
          userId,
          type: "BOOKING",
          sourceId: c.id,
          title: "Beri Ulasan Kelas",
          body: `Bagaimana kelas ${c.session.classType.name} bersama ${c.session.coach.name}? Yuk beri ulasanmu.`,
          actionUrl: "/dashboard",
        })
      )
    );
  }

  return prisma.classRegistration.findMany({
    where: { userId, status: "ATTENDED", session: { reviews: { none: { userId } } } },
    include: { session: { include: { classType: true, coach: true } } },
    orderBy: { session: { date: "desc" } },
    take: 5,
  });
}
