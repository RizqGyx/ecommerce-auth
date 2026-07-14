import ClassTypeForm from "../ClassTypeForm";
import { createClassType } from "../actions";

export default function NewClassTypePage() {
  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Tambah Kelas</h1>
      <ClassTypeForm action={createClassType} />
    </div>
  );
}
