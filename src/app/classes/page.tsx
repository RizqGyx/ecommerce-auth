import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import ClassesPageClient from "./ClassesPageClient";

export const metadata = buildMetadata({
  title: "Kelas & Program Latihan",
  description:
    "Temukan kelas yang tepat untukmu — Zumba, Muay Thai, Calisthenics, Poundfit, Yoga, dan lainnya. Dibimbing coach bersertifikat di S-One Gym Bukittinggi.",
  path: "/classes",
});

export default async function ClassesPage() {
  const classTypes = await prisma.classType.findMany({ orderBy: { name: "asc" } });
  return <ClassesPageClient classTypes={classTypes} />;
}
