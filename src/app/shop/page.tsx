import { prisma } from "@/lib/prisma";
import { toProductData } from "@/lib/serializers";
import ShopPageClient from "./ShopPageClient";

export default async function ShopPage() {
  const productRows = await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  });
  const products = productRows.map(toProductData);

  return <ShopPageClient products={products} />;
}
