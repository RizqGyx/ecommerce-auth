import CoachForm from "../CoachForm";
import { createCoach } from "../actions";

export default function NewCoachPage() {
  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Tambah Coach</h1>
      <CoachForm action={createCoach} />
    </div>
  );
}
