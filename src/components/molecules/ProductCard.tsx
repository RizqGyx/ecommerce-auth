"use client";

import { ShoppingCart, Star, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PRODUCT_ICONS: Record<string, string> = {
  Supplements: "💊",
  Food: "🥗",
  Merchandise: "👕",
  Equipment: "🏋️",
};

export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  category: string;
  rating: number;
  reviews: number;
  badge?: string | null;
}

interface ProductCardProps {
  product: ProductData;
  onAddToCart?: () => void;
  className?: string;
}

const ProductCard = ({ product, onAddToCart, className }: ProductCardProps) => {
  const badgeColor =
    product.badge === "Best Seller"
      ? "bg-yellow-400/90 text-black"
      : product.badge === "Sale"
      ? "bg-red-500/90 text-white"
      : product.badge === "New"
      ? "bg-primary/90 text-primary-foreground"
      : "bg-accent/90 text-accent-foreground";

  return (
    <div
      className={cn(
        "group glass rounded-2xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10",
        className
      )}
    >
      <div className="relative h-44 bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden">
        <span className="text-6xl opacity-30 select-none group-hover:scale-110 transition-transform duration-300">
          {PRODUCT_ICONS[product.category]}
        </span>
        {product.badge && (
          <div className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
            {product.badge}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          <Tag size={10} className="text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{product.category}</span>
        </div>

        <h3 className="font-semibold text-sm mb-1 leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="font-bold text-primary">
              Rp {product.price.toLocaleString("id-ID")}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-muted-foreground line-through">
                Rp {product.originalPrice.toLocaleString("id-ID")}
              </div>
            )}
          </div>
          <Button variant="hero" size="sm" className="text-xs px-3" onClick={onAddToCart}>
            <ShoppingCart size={13} />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
