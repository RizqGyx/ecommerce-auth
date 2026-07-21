import { NextResponse } from "next/server";
import { hash } from "bcrypt-ts";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateOtpCode, OTP_EXPIRY_MINUTES } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/mailer";

const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(1, "Nomor telepon wajib diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Data tidak valid" },
      { status: 400 }
    );
  }

  const { name, email, phone, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "Email sudah terdaftar" },
      { status: 409 }
    );
  }

  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, phone, password: hashedPassword },
  });

  const code = generateOtpCode();
  await prisma.otp.create({
    data: {
      userId: user.id,
      code,
      expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
    },
  });

  try {
    await sendOtpEmail(user.email, code);
  } catch (err) {
    console.error("Failed to send OTP email:", err);
  }

  return NextResponse.json({ id: user.id, name: user.name, email: user.email });
}
