import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ClassTypeForm from "../../ClassTypeForm";
import { updateClassType } from "../../actions";

export default async function EditClassTypePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const classType = await prisma.classType.findUnique({ where: { id } });

  if (!classType) notFound();

  const updateClassTypeWithId = updateClassType.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Edit Kelas</h1>
      <ClassTypeForm action={updateClassTypeWithId} classType={classType} />
    </div>
  );
}
