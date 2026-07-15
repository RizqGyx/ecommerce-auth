import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminSidebar from "@/components/organisms/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/");

  return (
    <div className="min-h-screen flex bg-background">
      <AdminSidebar adminName={session.user.name ?? session.user.email ?? "Admin"} />
      <main className="flex-1 min-w-0 p-8">{children}</main>
    </div>
  );
}
