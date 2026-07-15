import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import AdminTable from "@/components/admin/AdminTable";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteClassType } from "./actions";

export default async function AdminClassesPage() {
  const classTypes = await prisma.classType.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black mb-1">Classes</h1>
          <p className="text-sm text-muted-foreground">{classTypes.length} tipe kelas</p>
        </div>
        <Button variant="hero" asChild>
          <Link href="/admin/classes/new"><Plus size={16} /> Tambah Kelas</Link>
        </Button>
      </div>

      <AdminTable
        rows={classTypes}
        rowKey={(c) => c.id}
        columns={[
          { header: "Nama", render: (c) => <span className="font-semibold">{c.icon} {c.name}</span> },
          { header: "Slug", render: (c) => c.slug },
          { header: "Durasi", render: (c) => `${c.duration} menit` },
          { header: "Level", render: (c) => c.level },
          {
            header: "Aksi",
            render: (c) => (
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/classes/${c.id}/edit`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <Pencil size={13} /> Edit
                </Link>
                <DeleteButton action={deleteClassType.bind(null, c.id)} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
