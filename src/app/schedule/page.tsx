import { prisma } from "@/lib/prisma";
import { toScheduleSession } from "@/lib/serializers";
import { buildMetadata } from "@/lib/seo";
import SchedulePageClient from "./SchedulePageClient";

export const metadata = buildMetadata({
  title: "Jadwal Kelas Mingguan",
  description:
    "Lihat jadwal kelas mingguan S-One Gym Bukittinggi dan booking langsung — Zumba, Muay Thai, Calisthenics, Poundfit, dan Yoga setiap hari.",
  path: "/schedule",
});

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const WEEKDAY_INDEX: Record<string, number> = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6,
};

function nextDateForWeekday(dayName: string, from: Date): Date {
  const target = WEEKDAY_INDEX[dayName];
  const date = new Date(from);
  date.setHours(0, 0, 0, 0);
  const diff = (target - date.getDay() + 7) % 7;
  date.setDate(date.getDate() + diff);
  return date;
}

export default async function SchedulePage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekFromNow = new Date(today);
  weekFromNow.setDate(weekFromNow.getDate() + 7);

  const [classTypes, sessionRows] = await Promise.all([
    prisma.classType.findMany({ orderBy: { name: "asc" } }),
    prisma.classSession.findMany({
      where: { date: { gte: today, lt: weekFromNow } },
      include: { classType: true, coach: true, _count: { select: { registrations: true } } },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
    }),
  ]);

  const scheduleByDay: Record<string, ReturnType<typeof toScheduleSession>[]> = {};
  const dayDates: Record<string, string> = {};

  for (const day of DAYS) {
    dayDates[day] = String(nextDateForWeekday(day, today).getDate()).padStart(2, "0");
  }

  for (const row of sessionRows) {
    const dayName = row.date.toLocaleDateString("en-US", { weekday: "long" });
    if (!scheduleByDay[dayName]) scheduleByDay[dayName] = [];
    scheduleByDay[dayName].push(toScheduleSession(row));
  }

  return (
    <SchedulePageClient
      classTypes={classTypes}
      scheduleByDay={scheduleByDay}
      dayDates={dayDates}
    />
  );
}
