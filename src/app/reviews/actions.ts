"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireVerifiedUser } from "@/lib/authGuards";

type ReviewResult = { success: true } | { success: false; error: string };

export async function submitProductReview(
  orderId: string,
  productId: string,
  rating: number,
  comment?: string
): Promise<ReviewResult> {
  const session = await requireVerifiedUser(`/checkout/success?orderId=${orderId}`);

  const item = await prisma.orderItem.findFirst({
    where: { orderId, productId, order: { userId: session.user.id } },
  });
  if (!item) return { success: false, error: "Item tidak ditemukan di pesanan ini." };

  await prisma.$transaction(async (tx) => {
    await tx.review.upsert({
      where: { userId_productId: { userId: session.user.id, productId } },
      update: { rating, comment },
      create: { userId: session.user.id, targetType: "PRODUCT", productId, rating, comment },
    });

    const agg = await tx.review.aggregate({
      where: { productId },
      _avg: { rating: true },
      _count: { rating: true },
    });
    await tx.product.update({
      where: { id: productId },
      data: { rating: agg._avg.rating ?? 0, reviewsCount: agg._count.rating },
    });
  });

  revalidatePath("/shop");
  revalidatePath("/");
  return { success: true };
}

export async function submitClassReview(
  classSessionId: string,
  rating: number,
  comment?: string
): Promise<ReviewResult> {
  const session = await requireVerifiedUser("/dashboard");

  const reg = await prisma.classRegistration.findFirst({
    where: { userId: session.user.id, sessionId: classSessionId, status: "ATTENDED" },
  });
  if (!reg) return { success: false, error: "Kelas ini belum bisa diulas." };

  await prisma.review.upsert({
    where: { userId_classSessionId: { userId: session.user.id, classSessionId } },
    update: { rating, comment },
    create: { userId: session.user.id, targetType: "CLASS_SESSION", classSessionId, rating, comment },
  });

  revalidatePath("/dashboard");
  revalidatePath("/");
  return { success: true };
}

export async function submitPtReview(
  ptBookingId: string,
  rating: number,
  comment?: string
): Promise<ReviewResult> {
  const session = await requireVerifiedUser("/personal-trainer");

  const booking = await prisma.pTBooking.findFirst({
    where: { id: ptBookingId, userId: session.user.id },
  });
  if (!booking) return { success: false, error: "Paket PT tidak ditemukan." };

  await prisma.review.upsert({
    where: { userId_ptBookingId: { userId: session.user.id, ptBookingId } },
    update: { rating, comment },
    create: { userId: session.user.id, targetType: "PT_BOOKING", ptBookingId, rating, comment },
  });

  revalidatePath("/dashboard");
  revalidatePath("/");
  return { success: true };
}
