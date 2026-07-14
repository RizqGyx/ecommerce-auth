import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import AdminTable from "@/components/admin/AdminTable";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteCoach } from "./actions";

export default async function AdminCoachesPage() {
  const coaches = await prisma.coach.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black mb-1">Coaches</h1>
          <p className="text-sm text-muted-foreground">{coaches.length} coach terdaftar</p>
        </div>
        <Button variant="hero" asChild>
          <Link href="/admin/coaches/new"><Plus size={16} /> Tambah Coach</Link>
        </Button>
      </div>

      <AdminTable
        rows={coaches}
        rowKey={(c) => c.id}
        columns={[
          { header: "Nama", render: (c) => <span className="font-semibold">{c.name}</span> },
          { header: "Jabatan", render: (c) => c.title },
          { header: "Pengalaman", render: (c) => `${c.experience} tahun` },
          {
            header: "Status",
            render: (c) => (
              <div className="flex gap-1.5">
                {c.featured && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400">Featured</span>}
                {c.isPersonalTrainer && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">PT</span>}
              </div>
            ),
          },
          {
            header: "Aksi",
            render: (c) => (
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/coaches/${c.id}/edit`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <Pencil size={13} /> Edit
                </Link>
                <DeleteButton action={deleteCoach.bind(null, c.id)} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
