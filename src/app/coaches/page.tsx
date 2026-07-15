import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import CoachesPageClient from "./CoachesPageClient";

export const metadata = buildMetadata({
  title: "Tim Pelatih & Personal Trainer",
  description:
    "Kenali coach dan personal trainer bersertifikat internasional di S-One Gym Bukittinggi — spesialis Zumba, Muay Thai, Calisthenics, dan strength training.",
  path: "/coaches",
});

export default async function CoachesPage() {
  const coaches = await prisma.coach.findMany({ orderBy: { name: "asc" } });
  return <CoachesPageClient coaches={coaches} />;
}
