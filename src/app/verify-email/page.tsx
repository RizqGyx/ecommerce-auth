import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import VerifyEmailClient from "./VerifyEmailClient";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.isVerified) redirect(callbackUrl ?? "/dashboard");

  return <VerifyEmailClient email={session.user.email ?? ""} callbackUrl={callbackUrl ?? "/dashboard"} />;
}
