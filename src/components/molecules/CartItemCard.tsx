"use client";

import { Minus, Plus, Trash2, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/context/CartContext";

const CATEGORY_ICONS: Record<string, string> = {
  Supplements: "💊",
  Food: "🥗",
  Merchandise: "👕",
  Equipment: "🏋️",
};

interface CartItemCardProps {
  item: CartItem;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  className?: string;
}

const CartItemCard = ({ item, onUpdateQty, onRemove, className }: CartItemCardProps) => {
  return (
    <div className={cn("glass rounded-2xl p-4 border border-border/20 flex items-center gap-4", className)}>
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center shrink-0 text-2xl">
        {CATEGORY_ICONS[item.category] ?? "📦"}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm leading-snug line-clamp-2">{item.name}</h4>
        <div className="flex items-center gap-1 mt-0.5">
          <Tag size={10} className="text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">{item.category}</span>
          {item.badge && (
            <span className="text-[9px] font-bold bg-primary/10 text-primary border border-primary/20 px-1.5 rounded-full ml-1">
              {item.badge}
            </span>
          )}
        </div>
        <div className="font-bold text-primary text-sm mt-1">
          Rp {(item.price * item.quantity).toLocaleString("id-ID")}
        </div>
        <div className="text-[10px] text-muted-foreground">
          Rp {item.price.toLocaleString("id-ID")} / item
        </div>
      </div>

      {/* Qty controls */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <button
          onClick={() => onRemove(item.id)}
          className="text-muted-foreground/50 hover:text-red-400 transition-colors p-1"
          aria-label="Remove item"
        >
          <Trash2 size={14} />
        </button>

        <div className="flex items-center gap-1.5 glass border border-border/30 rounded-xl overflow-hidden">
          <button
            onClick={() => onUpdateQty(item.id, item.quantity - 1)}
            className="p-1.5 hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
          >
            <Minus size={13} />
          </button>
          <span className="text-sm font-bold min-w-6 text-center">{item.quantity}</span>
          <button
            onClick={() => onUpdateQty(item.id, item.quantity + 1)}
            className="p-1.5 hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
          >
            <Plus size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
