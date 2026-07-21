export const OTP_EXPIRY_MINUTES = 10;

export function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
