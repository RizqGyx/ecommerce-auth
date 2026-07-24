import nodemailer from "nodemailer";
import { OTP_EXPIRY_MINUTES } from "@/lib/otp";

// `pool: true` keeps a warm SMTP connection instead of renegotiating TLS with
// Gmail from scratch on every send — a cold first connection is the usual
// cause of the first OTP silently failing while "resend" (a warm second
// connection) works fine.
const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendOtpEmail(to: string, code: string) {
  const mail = {
    from: `"S-One Gym" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Kode Verifikasi Akun S-One Gym",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #111;">Verifikasi Akun S-One Gym</h2>
        <p>Gunakan kode berikut untuk memverifikasi akunmu:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 24px 0; color: #111;">${code}</div>
        <p style="color: #666; font-size: 14px;">Kode ini berlaku selama ${OTP_EXPIRY_MINUTES} menit. Jika kamu tidak merasa mendaftar di S-One Gym, abaikan email ini.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mail);
  } catch (err) {
    // One retry: covers the transient "first connection of the process" flake.
    console.error("sendOtpEmail failed, retrying once:", err);
    await transporter.sendMail(mail);
  }
}
