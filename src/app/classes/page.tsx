import { prisma } from "@/lib/prisma";
import ClassesPageClient from "./ClassesPageClient";

export default async function ClassesPage() {
  const classTypes = await prisma.classType.findMany({ orderBy: { name: "asc" } });
  return <ClassesPageClient classTypes={classTypes} />;
}
