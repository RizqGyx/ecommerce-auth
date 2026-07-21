"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateOtpCode, OTP_EXPIRY_MINUTES } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/mailer";

export async function verifyOtpCode(code: string) {
  const session = await auth();
  if (!session?.user) return { success: false, error: "Kamu harus login terlebih dahulu." };

  const otp = await prisma.otp.findFirst({
    where: {
      userId: session.user.id,
      consumedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!otp) {
    return { success: false, error: "Kode tidak ditemukan atau sudah kedaluwarsa. Kirim ulang kode." };
  }

  if (otp.code !== code) {
    await prisma.otp.update({
      where: { id: otp.id },
      data: { attempts: { increment: 1 } },
    });
    return { success: false, error: "Kode salah. Coba lagi." };
  }

  await prisma.$transaction([
    prisma.otp.update({ where: { id: otp.id }, data: { consumedAt: new Date() } }),
    prisma.user.update({ where: { id: session.user.id }, data: { emailVerified: new Date() } }),
  ]);

  return { success: true };
}

export async function resendOtpCode() {
  const session = await auth();
  if (!session?.user?.email) return { success: false, error: "Kamu harus login terlebih dahulu." };

  const code = generateOtpCode();
  await prisma.otp.create({
    data: {
      userId: session.user.id,
      code,
      expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
    },
  });

  try {
    await sendOtpEmail(session.user.email, code);
  } catch (err) {
    console.error("Failed to resend OTP email:", err);
    return { success: false, error: "Gagal mengirim email. Coba lagi nanti." };
  }

  return { success: true };
}
