import { prisma } from "@/lib/prisma";
import PTBookPageClient from "./PTBookPageClient";

export default async function PTBookPage({
  searchParams,
}: {
  searchParams: Promise<{ trainer?: string; package?: string }>;
}) {
  const { trainer, package: pkg } = await searchParams;

  const pts = await prisma.coach.findMany({
    where: { isPersonalTrainer: true },
    orderBy: { name: "asc" },
  });

  return <PTBookPageClient pts={pts} trainerParam={trainer ?? ""} packageParam={pkg ?? ""} />;
}
