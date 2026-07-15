import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "../../ProductForm";
import { updateProduct } from "../../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  const updateProductWithId = updateProduct.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Edit Produk</h1>
      <ProductForm action={updateProductWithId} categories={categories} product={product} />
    </div>
  );
}
