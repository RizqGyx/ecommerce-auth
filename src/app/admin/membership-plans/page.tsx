import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import AdminTable from "@/components/admin/AdminTable";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteMembershipPlan } from "./actions";

export default async function AdminMembershipPlansPage() {
  const plans = await prisma.membershipPlan.findMany({ orderBy: { price: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black mb-1">Membership Plans</h1>
          <p className="text-sm text-muted-foreground">{plans.length} paket membership</p>
        </div>
        <Button variant="hero" asChild>
          <Link href="/admin/membership-plans/new"><Plus size={16} /> Tambah Paket</Link>
        </Button>
      </div>

      <AdminTable
        rows={plans}
        rowKey={(p) => p.id}
        columns={[
          { header: "Nama", render: (p) => <span className="font-semibold">{p.name}</span> },
          { header: "Harga", render: (p) => `Rp ${p.price.toLocaleString("id-ID")}/bln` },
          { header: "Populer", render: (p) => (p.popular ? "✓" : "-") },
          {
            header: "Aksi",
            render: (p) => (
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/membership-plans/${p.id}/edit`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <Pencil size={13} /> Edit
                </Link>
                <DeleteButton action={deleteMembershipPlan.bind(null, p.id)} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
