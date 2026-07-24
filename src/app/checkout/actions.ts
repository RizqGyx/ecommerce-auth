"use server";

import { prisma } from "@/lib/prisma";
import { requireVerifiedUser } from "@/lib/authGuards";
import { createPaymentIntent } from "@/lib/paymentIntent";

interface CheckoutItem {
  productId: string;
  quantity: number;
}

export async function createShopPaymentIntent(items: CheckoutItem[]) {
  const session = await requireVerifiedUser("/checkout");

  if (items.length === 0) throw new Error("Keranjang kosong.");

  const products = await prisma.product.findMany({
    where: { id: { in: items.map((i) => i.productId) } },
  });

  const total = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) throw new Error("Produk tidak ditemukan.");
    return sum + product.price * item.quantity;
  }, 0);

  return createPaymentIntent({
    userId: session.user.id,
    userName: session.user.name ?? "Member",
    userEmail: session.user.email ?? "",
    type: "SHOP",
    amount: total,
    payload: { items },
  });
}
