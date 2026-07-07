import { prisma } from "@/lib/prisma";
import CoachesPageClient from "./CoachesPageClient";

export default async function CoachesPage() {
  const coaches = await prisma.coach.findMany({ orderBy: { name: "asc" } });
  return <CoachesPageClient coaches={coaches} />;
}
