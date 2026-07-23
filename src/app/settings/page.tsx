import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SettingsPageClient from "./SettingsPageClient";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/settings");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");

  return (
    <SettingsPageClient
      user={{
        name: user.name ?? "",
        email: user.email,
        phone: user.phone ?? "",
        hasPassword: !!user.password,
      }}
    />
  );
}
