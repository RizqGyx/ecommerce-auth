import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MembershipPlanForm from "../../MembershipPlanForm";
import { updateMembershipPlan } from "../../actions";

export default async function EditMembershipPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plan = await prisma.membershipPlan.findUnique({ where: { id } });

  if (!plan) notFound();

  const updatePlanWithId = updateMembershipPlan.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Edit Paket Membership</h1>
      <MembershipPlanForm action={updatePlanWithId} plan={plan} />
    </div>
  );
}
