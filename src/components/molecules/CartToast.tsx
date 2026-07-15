"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartToast() {
  const { toast, dismissToast } = useCart();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(dismissToast, 2500);
    return () => clearTimeout(timer);
  }, [toast, dismissToast]);

  if (!toast) return null;

  return (
    <div
      key={toast.id}
      className="fixed bottom-24 right-6 z-[60] animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <div className="glass rounded-xl border border-primary/30 shadow-xl shadow-black/40 px-4 py-3 flex items-center gap-2.5 max-w-72">
        <CheckCircle size={18} className="text-primary shrink-0" />
        <p className="text-sm">
          <span className="font-semibold">{toast.name}</span>
          <span className="text-muted-foreground"> ditambahkan ke keranjang</span>
        </p>
      </div>
    </div>
  );
}
