import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requireUser(callbackUrl: string) {
  const session = await auth();
  if (!session?.user) redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  return session;
}

export async function requireVerifiedUser(callbackUrl: string) {
  const session = await requireUser(callbackUrl);
  if (!session.user.isVerified) redirect(`/verify-email?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  return session;
}
