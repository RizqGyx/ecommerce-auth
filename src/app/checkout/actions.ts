"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireVerifiedUser } from "@/lib/authGuards";
import { createNotification } from "@/lib/notifications";

interface CheckoutItem {
  productId: string;
  quantity: number;
}

export async function placeOrder(orderId: string, items: CheckoutItem[], method: string) {
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

  const order = await prisma.order.create({
    data: {
      id: orderId,
      userId: session.user.id,
      status: "PAID",
      total,
      items: {
        create: items.map((item) => {
          const product = products.find((p) => p.id === item.productId)!;
          return { productId: item.productId, quantity: item.quantity, price: product.price };
        }),
      },
      payment: {
        create: {
          amount: total,
          method,
          status: "SUCCESS",
          transactionId: `SIM-${Date.now()}`,
        },
      },
    },
  });

  await createNotification(prisma, {
    userId: session.user.id,
    type: "PAYMENT",
    sourceId: order.id,
    title: "Pembayaran Berhasil",
    body: `Pembayaran pesanan senilai Rp ${total.toLocaleString("id-ID")} melalui ${method} telah berhasil.`,
    actionUrl: "/orders",
  });

  revalidatePath("/orders");
  revalidatePath("/transactions");
  revalidatePath("/dashboard");
}
