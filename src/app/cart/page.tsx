"use client";

import Link from "next/link";
import { ShoppingCart, ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import CartItemCard from "@/components/molecules/CartItemCard";
import Reveal from "@/components/atoms/Reveal";

const SHIPPING_ESTIMATE = 15000;

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart, subtotal, totalItems } = useCart();

  const total = subtotal + (items.length > 0 ? SHIPPING_ESTIMATE : 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-primary/50" />
          </div>
          <h2 className="text-2xl font-black mb-2">Keranjangmu Kosong</h2>
          <p className="text-muted-foreground mb-8">Belum ada produk di keranjang. Yuk, mulai belanja!</p>
          <Button variant="hero" size="lg" asChild>
            <Link href="/shop">Ke Halaman Shop <ArrowRight size={18} /></Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black">Keranjang <span className="gradient-text">Belanja</span></h1>
            <p className="text-sm text-muted-foreground mt-1">{totalItems} produk di keranjang</p>
          </div>
          <button
            onClick={clearCart}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-red-400 transition-colors"
          >
            <Trash2 size={13} /> Kosongkan
          </button>
        </div>

        <Reveal className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onUpdateQty={updateQty}
                onRemove={removeItem}
              />
            ))}
            <Link
              href="/shop"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mt-4"
            >
              <ShoppingCart size={14} /> Lanjutkan Belanja
            </Link>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl border border-border/20 p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-5">Ringkasan Pesanan</h3>

              <div className="space-y-3 text-sm mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-muted-foreground">
                    <span className="truncate pr-4">{item.name} ×{item.quantity}</span>
                    <span className="shrink-0">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/20 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Ongkos Kirim (estimasi)</span>
                  <span>Rp {SHIPPING_ESTIMATE.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between font-black text-lg pt-3 border-t border-border/20">
                  <span>Total</span>
                  <span className="gradient-text">Rp {total.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <Button variant="hero" size="lg" className="w-full mt-6" asChild>
                <Link href="/checkout">
                  Lanjut ke Checkout <ArrowRight size={16} />
                </Link>
              </Button>

              <div className="mt-4 text-center text-xs text-muted-foreground">
                🔒 Pembayaran aman dengan enkripsi SSL
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
