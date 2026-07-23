import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toOrderSummary, toClassRegistrationSummary, toPtBookingSummary } from "@/lib/serializers";
import TransactionsPageClient from "./TransactionsPageClient";

export const metadata = { robots: { index: false, follow: false } };

export default async function TransactionsPage() {
  const session = await auth();
  if (!session?.user) notFound();

  const userId = session.user.id;

  const [orders, registrations, ptBookings] = await Promise.all([
    prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
    }),
    prisma.classRegistration.findMany({
      where: { userId },
      include: { session: { include: { classType: true, coach: true } } },
    }),
    prisma.pTBooking.findMany({
      where: { userId },
      include: { coach: true },
    }),
  ]);

  const transactions = [
    ...orders.map(toOrderSummary),
    ...registrations.map(toClassRegistrationSummary),
    ...ptBookings.map(toPtBookingSummary),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return <TransactionsPageClient transactions={transactions} />;
}
