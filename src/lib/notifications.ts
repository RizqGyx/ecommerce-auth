import type { Prisma, NotificationType } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

interface CreateNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  sourceId: string;
  actionUrl?: string;
}

export async function createNotification(
  tx: Prisma.TransactionClient | typeof prisma,
  input: CreateNotificationInput
) {
  await tx.notification.upsert({
    where: {
      userId_type_sourceId: {
        userId: input.userId,
        type: input.type,
        sourceId: input.sourceId,
      },
    },
    update: {},
    create: input,
  });
}

export function sessionEndInstant(session: { date: Date; endTime: string }): Date {
  const [hours, minutes] = session.endTime.split(":").map(Number);
  const end = new Date(session.date);
  end.setHours(hours, minutes, 0, 0);
  return end;
}
