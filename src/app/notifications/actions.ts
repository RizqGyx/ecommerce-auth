"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/authGuards";
import { toNotificationView, type NotificationView } from "@/lib/serializers";

export async function getNotifications(): Promise<NotificationView[]> {
  const session = await requireUser("/notifications");
  const userId = session.user.id;

  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  const [rows, expiringPt] = await Promise.all([
    prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }),
    prisma.pTBooking.findFirst({
      where: { userId, status: "ACTIVE", endDate: { gte: new Date(), lte: sevenDaysFromNow } },
      orderBy: { endDate: "asc" },
    }),
  ]);

  const list: NotificationView[] = rows.map(toNotificationView);

  if (expiringPt) {
    const daysLeft = Math.max(1, Math.ceil((expiringPt.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
    list.unshift({
      id: `virtual-pt-expiring-${expiringPt.id}`,
      type: "PT",
      title: "Paket PT Segera Habis",
      body: `Paket ${expiringPt.packageName} kamu berakhir ${daysLeft} hari lagi.`,
      time: "Sekarang",
      read: false,
      starred: false,
      isVirtual: true,
    });
  }

  return list;
}

export async function markNotificationRead(id: string) {
  if (id.startsWith("virtual-")) return;
  const session = await requireUser("/notifications");
  await prisma.notification.updateMany({ where: { id, userId: session.user.id }, data: { read: true } });
}

export async function markNotificationUnread(id: string) {
  if (id.startsWith("virtual-")) return;
  const session = await requireUser("/notifications");
  await prisma.notification.updateMany({ where: { id, userId: session.user.id }, data: { read: false } });
}

export async function markAllNotificationsRead() {
  const session = await requireUser("/notifications");
  await prisma.notification.updateMany({ where: { userId: session.user.id, read: false }, data: { read: true } });
}

export async function toggleNotificationStar(id: string) {
  if (id.startsWith("virtual-")) return;
  const session = await requireUser("/notifications");
  const notif = await prisma.notification.findFirst({ where: { id, userId: session.user.id } });
  if (!notif) return;
  await prisma.notification.update({ where: { id }, data: { starred: !notif.starred } });
}

export async function deleteNotification(id: string) {
  if (id.startsWith("virtual-")) return;
  const session = await requireUser("/notifications");
  await prisma.notification.deleteMany({ where: { id, userId: session.user.id } });
}

export async function deleteNotifications(ids: string[]) {
  const session = await requireUser("/notifications");
  const realIds = ids.filter((id) => !id.startsWith("virtual-"));
  await prisma.notification.deleteMany({ where: { id: { in: realIds }, userId: session.user.id } });
}
