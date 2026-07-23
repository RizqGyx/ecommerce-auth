import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { toScheduleSession } from "@/lib/serializers";
import BookingPageClient from "./BookingPageClient";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ day?: string; sessionId?: string }>;
}) {
  const { day, sessionId } = await searchParams;

  const sessionRow = sessionId
    ? await prisma.classSession.findUnique({
        where: { id: sessionId },
        include: { classType: true, coach: true, _count: { select: { registrations: true } } },
      })
    : null;

  if (!sessionRow) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Sesi kelas tidak ditemukan.</p>
          <Button variant="hero" asChild><Link href="/schedule">Kembali ke Jadwal</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <BookingPageClient
      session={toScheduleSession(sessionRow)}
      day={day ?? "Monday"}
      sessionId={sessionRow.id}
    />
  );
}
