import { prisma } from "@/lib/prisma";
import { toProductData } from "@/lib/serializers";
import { buildMetadata } from "@/lib/seo";
import ShopPageClient from "./ShopPageClient";

export const metadata = buildMetadata({
  title: "Toko — Suplemen & Perlengkapan Gym",
  description:
    "Belanja suplemen, merchandise, dan perlengkapan olahraga resmi S-One Gym Bukittinggi. Whey protein, apparel, dan alat latihan.",
  path: "/shop",
});

export default async function ShopPage() {
  const productRows = await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  });
  const products = productRows.map(toProductData);

  return <ShopPageClient products={products} />;
}
