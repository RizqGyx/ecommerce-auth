import MembershipPlanForm from "../MembershipPlanForm";
import { createMembershipPlan } from "../actions";

export default function NewMembershipPlanPage() {
  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Tambah Paket Membership</h1>
      <MembershipPlanForm action={createMembershipPlan} />
    </div>
  );
}
