"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session.user;
}

export interface CheckInResult {
  valid: boolean;
  reason: string;
  member?: {
    name: string;
    email: string;
    planName: string;
    endDate: string;
    initials: string;
  };
}

export async function verifyMemberCard(rawCode: string): Promise<CheckInResult> {
  const admin = await requireAdmin();

  const code = rawCode.trim();
  if (!code) {
    return { valid: false, reason: "Kode kosong." };
  }

  // A scanner feeds the full barcodeCode; staff typing the visible "S1G-XXXXXXXX"
  // label off the card only has the last 8 chars, so fall back to a suffix match.
  const stripped = code.replace(/^S1G-/i, "");

  let card = await prisma.memberCard.findUnique({
    where: { barcodeCode: code },
    include: { user: true, membership: { include: { plan: true } } },
  });

  if (!card && stripped.length === 8) {
    card = await prisma.memberCard.findFirst({
      where: { barcodeCode: { endsWith: stripped, mode: "insensitive" } },
      include: { user: true, membership: { include: { plan: true } } },
    });
  }

  let result: CheckInResult;

  if (!card) {
    result = { valid: false, reason: "Kartu member tidak ditemukan." };
  } else if (card.membership.status !== "ACTIVE") {
    result = {
      valid: false,
      reason: `Membership tidak aktif (status: ${card.membership.status}).`,
      member: {
        name: card.user.name ?? card.user.email,
        email: card.user.email,
        planName: card.membership.plan.name,
        endDate: card.membership.endDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
        initials: (card.user.name ?? card.user.email).split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase(),
      },
    };
  } else if (card.membership.endDate < new Date()) {
    result = {
      valid: false,
      reason: "Membership sudah kedaluwarsa.",
      member: {
        name: card.user.name ?? card.user.email,
        email: card.user.email,
        planName: card.membership.plan.name,
        endDate: card.membership.endDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
        initials: (card.user.name ?? card.user.email).split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase(),
      },
    };
  } else {
    result = {
      valid: true,
      reason: "Membership aktif.",
      member: {
        name: card.user.name ?? card.user.email,
        email: card.user.email,
        planName: card.membership.plan.name,
        endDate: card.membership.endDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
        initials: (card.user.name ?? card.user.email).split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase(),
      },
    };
  }

  await prisma.memberCheckIn.create({
    data: {
      userId: card?.userId ?? null,
      scannedCode: code,
      valid: result.valid,
      reason: result.reason,
      scannedBy: admin.email ?? admin.id,
    },
  });

  revalidatePath("/admin/check-in");
  return result;
}

export async function getRecentCheckIns() {
  await requireAdmin();
  return prisma.memberCheckIn.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
    include: { user: { select: { name: true, email: true } } },
  });
}
