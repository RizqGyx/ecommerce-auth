"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function FloatingCartButton() {
  const { totalItems, toast } = useCart();
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();

  if (!isLoggedIn || totalItems === 0 || pathname === "/cart") return null;

  return (
    <Link
      href="/cart"
      className={`fixed bottom-6 right-6 z-[55] w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 transition-transform duration-300 ${
        toast ? "animate-bounce" : ""
      }`}
    >
      <ShoppingCart size={22} className="text-white" />
      <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-white text-primary text-[11px] font-black flex items-center justify-center border-2 border-background">
        {totalItems > 9 ? "9+" : totalItems}
      </span>
    </Link>
  );
}
