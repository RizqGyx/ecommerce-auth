import { prisma } from "@/lib/prisma";
import ProductForm from "../ProductForm";
import { createProduct } from "../actions";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Tambah Produk</h1>
      <ProductForm action={createProduct} categories={categories} />
    </div>
  );
}
