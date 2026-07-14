import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CoachForm from "../../CoachForm";
import { updateCoach } from "../../actions";

export default async function EditCoachPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coach = await prisma.coach.findUnique({ where: { id } });

  if (!coach) notFound();

  const updateCoachWithId = updateCoach.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Edit Coach</h1>
      <CoachForm action={updateCoachWithId} coach={coach} />
    </div>
  );
}
