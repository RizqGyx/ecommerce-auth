"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Dumbbell,
  Users,
  CreditCard,
  Newspaper,
  ClipboardCheck,
  ScanLine,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Check-In Member", href: "/admin/check-in", icon: ScanLine },
  { name: "Products", href: "/admin/products", icon: ShoppingBag },
  { name: "Classes", href: "/admin/classes", icon: Dumbbell },
  { name: "Coaches", href: "/admin/coaches", icon: Users },
  { name: "PT Bookings", href: "/admin/pt-bookings", icon: ClipboardCheck },
  { name: "Membership Plans", href: "/admin/membership-plans", icon: CreditCard },
  { name: "Blog Posts", href: "/admin/blog-posts", icon: Newspaper },
];

export default function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="w-64 shrink-0 border-r border-border/20 bg-card/30 min-h-screen flex flex-col">
      <div className="p-5 border-b border-border/20">
        <Link href="/" className="text-lg font-black gradient-text">
          S-One Gym
        </Link>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Admin Panel</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(item.href)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            }`}
          >
            <item.icon size={16} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-border/20 space-y-1">
        <p className="px-3 py-1.5 text-xs text-muted-foreground truncate">{adminName}</p>
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        >
          <ArrowLeft size={16} />
          Kembali ke Situs
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-400/5 transition-colors"
        >
          <LogOut size={16} />
          Keluar
        </button>
      </div>
    </aside>
  );
}
