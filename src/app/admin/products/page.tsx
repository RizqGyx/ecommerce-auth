import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import AdminTable from "@/components/admin/AdminTable";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteProduct } from "./actions";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black mb-1">Products</h1>
          <p className="text-sm text-muted-foreground">{products.length} produk di S-One Store</p>
        </div>
        <Button variant="hero" asChild>
          <Link href="/admin/products/new"><Plus size={16} /> Tambah Produk</Link>
        </Button>
      </div>

      <AdminTable
        rows={products}
        rowKey={(p) => p.id}
        columns={[
          { header: "Nama", render: (p) => <span className="font-semibold">{p.name}</span> },
          { header: "Kategori", render: (p) => p.category?.name ?? "-" },
          { header: "Harga", render: (p) => `Rp ${p.price.toLocaleString("id-ID")}` },
          { header: "Badge", render: (p) => p.badge ?? "-" },
          {
            header: "Aksi",
            render: (p) => (
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/products/${p.id}/edit`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <Pencil size={13} /> Edit
                </Link>
                <DeleteButton action={deleteProduct.bind(null, p.id)} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
