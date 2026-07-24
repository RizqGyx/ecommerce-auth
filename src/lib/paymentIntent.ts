import { prisma } from "@/lib/prisma";
import { createNotification } from "@/lib/notifications";
import { PT_PACKAGES } from "@/lib/data";
import {
  createSnapTransaction,
  getTransactionStatus,
  isTransactionSuccess,
  isTransactionFailed,
  type SnapItemDetail,
} from "@/lib/midtrans";
import type { PaymentIntent, PaymentIntentType, Prisma } from "@/generated/prisma";

export type ShopIntentPayload = { items: { productId: string; quantity: number }[] };
export type ClassBookingIntentPayload = { sessionId: string };
export type PtBookingIntentPayload = { coachId: string; packageId: string };
export type MembershipIntentPayload = { planId: string; months: number };

interface CreatePaymentIntentParams {
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string | null;
  type: PaymentIntentType;
  amount: number;
  payload:
    | ShopIntentPayload
    | ClassBookingIntentPayload
    | PtBookingIntentPayload
    | MembershipIntentPayload;
}

async function buildShopItemDetails(payload: ShopIntentPayload): Promise<SnapItemDetail[]> {
  const products = await prisma.product.findMany({
    where: { id: { in: payload.items.map((i) => i.productId) } },
  });

  return payload.items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) throw new Error("Produk tidak ditemukan.");
    return { id: product.id, price: product.price, quantity: item.quantity, name: product.name };
  });
}

export async function createPaymentIntent(params: CreatePaymentIntentParams) {
  const intent = await prisma.paymentIntent.create({
    data: {
      userId: params.userId,
      type: params.type,
      amount: params.amount,
      payload: params.payload as unknown as Prisma.InputJsonValue,
    },
  });

  const items =
    params.type === "SHOP" ? await buildShopItemDetails(params.payload as ShopIntentPayload) : undefined;

  const { token } = await createSnapTransaction({
    orderId: intent.id,
    amount: params.amount,
    customer: {
      first_name: params.userName || "Member",
      email: params.userEmail,
      phone: params.userPhone ?? undefined,
    },
    items,
  });

  await prisma.paymentIntent.update({ where: { id: intent.id }, data: { snapToken: token } });

  return { intentId: intent.id, snapToken: token };
}

interface FulfillResult {
  status: "SUCCESS" | "FAILED" | "PENDING";
  type: PaymentIntentType;
  resultRef: string | null;
}

export async function fulfillPaymentIntent(intentId: string): Promise<FulfillResult> {
  const intent = await prisma.paymentIntent.findUnique({ where: { id: intentId } });
  if (!intent) throw new Error("Payment intent tidak ditemukan.");

  if (intent.status !== "PENDING") {
    return { status: intent.status, type: intent.type, resultRef: intent.resultRef };
  }

  const resultRef = await fulfillByType(intent);

  await prisma.paymentIntent.update({
    where: { id: intent.id },
    data: { status: "SUCCESS", resultRef },
  });

  return { status: "SUCCESS", type: intent.type, resultRef };
}

async function fulfillByType(intent: PaymentIntent): Promise<string> {
  switch (intent.type) {
    case "SHOP":
      return fulfillShop(intent);
    case "CLASS_BOOKING":
      return fulfillClassBooking(intent);
    case "PT_BOOKING":
      return fulfillPtBooking(intent);
    case "MEMBERSHIP":
      return fulfillMembership(intent);
    default:
      throw new Error(`Tipe payment intent tidak dikenal: ${intent.type}`);
  }
}

async function fulfillShop(intent: PaymentIntent): Promise<string> {
  const payload = intent.payload as unknown as ShopIntentPayload;
  const products = await prisma.product.findMany({
    where: { id: { in: payload.items.map((i) => i.productId) } },
  });

  const order = await prisma.order.create({
    data: {
      userId: intent.userId,
      status: "PAID",
      total: intent.amount,
      items: {
        create: payload.items.map((item) => {
          const product = products.find((p) => p.id === item.productId)!;
          return { productId: item.productId, quantity: item.quantity, price: product.price };
        }),
      },
      payment: {
        create: {
          amount: intent.amount,
          method: "Midtrans",
          status: "SUCCESS",
          transactionId: intent.id,
        },
      },
    },
  });

  await createNotification(prisma, {
    userId: intent.userId,
    type: "PAYMENT",
    sourceId: order.id,
    title: "Pembayaran Berhasil",
    body: `Pembayaran pesanan senilai Rp ${intent.amount.toLocaleString("id-ID")} telah berhasil.`,
    actionUrl: "/orders",
  });

  return order.id;
}

async function fulfillClassBooking(intent: PaymentIntent): Promise<string> {
  const payload = intent.payload as unknown as ClassBookingIntentPayload;

  const classSession = await prisma.classSession.findUnique({
    where: { id: payload.sessionId },
    include: { classType: true, coach: true },
  });
  if (!classSession) throw new Error("Sesi kelas tidak ditemukan.");

  const registration = await prisma.classRegistration.upsert({
    where: { userId_sessionId: { userId: intent.userId, sessionId: payload.sessionId } },
    update: {},
    create: { userId: intent.userId, sessionId: payload.sessionId },
  });

  const dateLabel = classSession.date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  await createNotification(prisma, {
    userId: intent.userId,
    type: "BOOKING",
    sourceId: registration.id,
    title: "Booking Dikonfirmasi",
    body: `Kelas ${classSession.classType.name} bersama ${classSession.coach.name}, ${dateLabel} pukul ${classSession.startTime} berhasil dikonfirmasi.`,
    actionUrl: "/schedule",
  });

  return registration.id;
}

async function fulfillPtBooking(intent: PaymentIntent): Promise<string> {
  const payload = intent.payload as unknown as PtBookingIntentPayload;

  const pkg = PT_PACKAGES.find((p) => p.id === payload.packageId);
  if (!pkg) throw new Error("Paket tidak ditemukan.");

  const coach = await prisma.coach.findUnique({ where: { id: payload.coachId } });
  if (!coach) throw new Error("Trainer tidak ditemukan.");

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + pkg.validDays);

  const booking = await prisma.pTBooking.create({
    data: {
      userId: intent.userId,
      coachId: payload.coachId,
      packageName: pkg.name,
      sessionsTotal: pkg.sessions,
      price: pkg.price,
      startDate,
      endDate,
    },
  });

  await createNotification(prisma, {
    userId: intent.userId,
    type: "PT",
    sourceId: booking.id,
    title: "Paket PT Aktif",
    body: `Paket ${pkg.name} bersama ${coach.name} telah aktif. Selamat berlatih!`,
    actionUrl: "/dashboard",
  });

  return booking.id;
}

async function fulfillMembership(intent: PaymentIntent): Promise<string> {
  const payload = intent.payload as unknown as MembershipIntentPayload;

  const plan = await prisma.membershipPlan.findUnique({ where: { id: payload.planId } });
  if (!plan) throw new Error("Paket membership tidak ditemukan.");

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + payload.months);

  const membership = await prisma.gymMembership.upsert({
    where: { userId: intent.userId },
    update: { planId: payload.planId, status: "ACTIVE", startDate, endDate },
    create: { userId: intent.userId, planId: payload.planId, status: "ACTIVE", startDate, endDate },
  });

  await prisma.memberCard.upsert({
    where: { userId: intent.userId },
    update: { membershipId: membership.id },
    create: { userId: intent.userId, membershipId: membership.id },
  });

  await createNotification(prisma, {
    userId: intent.userId,
    type: "PAYMENT",
    sourceId: membership.id,
    title: "Membership Aktif",
    body: `Paket ${plan.name} (${payload.months} bulan) telah aktif.`,
    actionUrl: "/dashboard",
  });

  return membership.id;
}

export async function checkPaymentIntentStatus(intentId: string): Promise<FulfillResult> {
  const intent = await prisma.paymentIntent.findUnique({ where: { id: intentId } });
  if (!intent) throw new Error("Payment intent tidak ditemukan.");

  if (intent.status !== "PENDING") {
    return { status: intent.status, type: intent.type, resultRef: intent.resultRef };
  }

  let midtransStatus;
  try {
    midtransStatus = await getTransactionStatus(intentId);
  } catch {
    return { status: "PENDING", type: intent.type, resultRef: null };
  }

  if (isTransactionSuccess(midtransStatus)) {
    return fulfillPaymentIntent(intentId);
  }

  if (isTransactionFailed(midtransStatus)) {
    await prisma.paymentIntent.update({ where: { id: intentId }, data: { status: "FAILED" } });
    return { status: "FAILED", type: intent.type, resultRef: null };
  }

  return { status: "PENDING", type: intent.type, resultRef: null };
}
