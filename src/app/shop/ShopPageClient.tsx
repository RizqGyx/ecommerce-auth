"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, Star, Zap, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ProductCard, { type ProductData } from "@/components/molecules/ProductCard";
import { useCart } from "@/context/CartContext";
import Reveal from "@/components/atoms/Reveal";

const CATEGORY_META: Record<string, { icon: string; label: string }> = {
  Supplements: { icon: "💊", label: "Suplemen" },
  Food: { icon: "🥗", label: "Makanan & Camilan" },
  Merchandise: { icon: "👕", label: "Merchandise" },
  Equipment: { icon: "🏋️", label: "Peralatan" },
};

function Shelf({
  category,
  products,
  onAddToCart,
  onSeeAll,
}: {
  category: string;
  products: ProductData[];
  onAddToCart: (p: ProductData) => void;
  onSeeAll: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const meta = CATEGORY_META[category] ?? { icon: "🛍️", label: category };

  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{meta.icon}</span>
          <h2 className="text-lg font-black tracking-tight">{meta.label}</h2>
          <span className="text-xs text-muted-foreground">{products.length} produk</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onSeeAll}
            className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            Lihat semua <ArrowRight size={12} />
          </button>
          <div className="hidden sm:flex items-center gap-1.5 ml-2">
            <button
              onClick={() => scrollBy(-1)}
              className="w-8 h-8 rounded-full glass border border-border/20 flex items-center justify-center hover:border-primary/40 transition-colors"
              aria-label="Scroll kiri"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="w-8 h-8 rounded-full glass border border-border/20 flex items-center justify-center hover:border-primary/40 transition-colors"
              aria-label="Scroll kanan"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="w-64 sm:w-72 shrink-0 snap-start"
            onAddToCart={() => onAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
}

const CATEGORIES = [
  { name: "Semua", icon: "🛍️", key: "All" },
  { name: "Suplemen", icon: "💊", key: "Supplements" },
  { name: "Makanan", icon: "🥗", key: "Food" },
  { name: "Merch", icon: "👕", key: "Merchandise" },
  { name: "Peralatan", icon: "🏋️", key: "Equipment" },
];

const MARQUEE_ITEMS = [
  "Whey Protein Gold Standard",
  "MMA Training Gloves",
  "S-One Gym Bag Pro",
  "BCAA Recovery Boost",
  "Resistance Band Set",
  "Energy Drink S-One Boost",
  "Creatine Monohydrate",
  "S-One Water Bottle 750ml",
  "Jump Rope Speed Cable",
  "S-One Performance Tee",
];

export default function ShopPageClient({ products }: { products: ProductData[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { addItem, totalItems } = useCart();

  const bestSellers = products.filter((p) => p.badge === "Terlaris" || p.rating >= 4.8);

  const filtered = products.filter(
    (p) =>
      (activeCategory === "All" || p.category === activeCategory) &&
      (search === "" || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  const featuredProduct = filtered[0];
  const restProducts = filtered.slice(1);

  const categoryCount = (key: string) =>
    key === "All" ? products.length : products.filter((p) => p.category === key).length;

  const isShelfView = activeCategory === "All" && search === "";

  const handleAddToCart = (p: ProductData) =>
    addItem({ id: p.id, name: p.name, price: p.price, category: p.category, badge: p.badge });

  return (
    <div className="min-h-screen pt-20">
      {/* ─── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-24">
        <div className="absolute inset-0 hologram-lines opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />

        {/* Decorative glow orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — headline */}
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
                <Zap size={11} /> S-One Official Store
              </span>
              <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-4">
                S-One <br />
                <span className="gradient-text">Store</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
                Suplemen, alat, dan merchandise eksklusif S-One — semua yang kamu butuhkan
                untuk latihan lebih keras, pulih lebih cepat, dan tampil maksimal.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  href="/cart"
                  className="flex items-center gap-3 glass rounded-2xl px-5 py-3 border border-primary/30 hover:border-primary/60 transition-colors bg-primary/5"
                >
                  <ShoppingCart size={18} className="text-primary" />
                  <span className="text-sm font-semibold">
                    {totalItems} item di keranjang
                  </span>
                </Link>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span>{products.length} produk &bull; {CATEGORIES.length - 1} kategori</span>
                </div>
              </div>
            </div>

            {/* Right — floating best-seller pills */}
            <div className="relative hidden lg:flex flex-col gap-4 items-end">
              {bestSellers.slice(0, 3).map((p, i) => (
                <div
                  key={p.id}
                  style={{ transform: `translateX(${i % 2 === 0 ? "0" : "-2rem"})` }}
                  className="glass rounded-2xl border border-primary/20 px-5 py-4 flex items-center gap-4 min-w-64 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-xl shrink-0 overflow-hidden">
                    {p.imageUrl ? (
                      <Image src={p.imageUrl} alt={p.name} fill sizes="40px" className="object-cover" />
                    ) : (
                      p.category === "Supplements" ? "💊" : p.category === "Equipment" ? "🏋️" : "👕"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{p.name}</p>
                    <p className="text-xs text-primary font-bold mt-0.5">
                      Rp {p.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                  {p.badge && (
                    <span className="shrink-0 text-[9px] font-black px-2 py-0.5 rounded-full bg-yellow-400/90 text-black">
                      {p.badge}
                    </span>
                  )}
                </div>
              ))}
              <div className="absolute -z-10 inset-0 bg-gradient-to-l from-primary/5 to-transparent rounded-3xl" />
            </div>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="mt-14 relative overflow-hidden border-y border-border/20 py-3 bg-primary/5">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-3 mx-6 text-xs font-semibold tracking-widest uppercase text-primary/70"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 inline-block" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Category Cards ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`relative group rounded-2xl p-4 flex flex-col items-center gap-2 border transition-all duration-300 hover:-translate-y-1 ${
                  isActive
                    ? "bg-gradient-to-br from-primary/30 to-accent/20 border-primary/50 shadow-lg shadow-primary/10"
                    : "glass border-border/20 hover:border-primary/30"
                }`}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span
                  className={`text-xs font-bold tracking-wide ${
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {cat.name}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "bg-muted/50 text-muted-foreground"
                  }`}
                >
                  {categoryCount(cat.key)} produk
                </span>
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/40 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── Best Sellers Strip ───────────────────────────────────────────────── */}
      {activeCategory === "All" && search === "" && (
        <section className="max-w-7xl mx-auto px-6 pt-8 pb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-yellow-400 to-primary" />
            <h2 className="text-lg font-black tracking-tight">
              Produk <span className="gradient-text">Terlaris</span>
            </h2>
            <span className="text-xs text-muted-foreground ml-2">Paling disukai member kami</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bestSellers.map((p) => (
              <div
                key={p.id}
                className="glass rounded-2xl border border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-400/5 overflow-hidden group"
              >
                <div className="relative h-28 bg-gradient-to-br from-yellow-900/20 to-primary/10 flex items-center justify-center overflow-hidden">
                  {p.imageUrl ? (
                    <>
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    </>
                  ) : (
                    <span className="text-5xl opacity-30 group-hover:scale-110 transition-transform duration-300">
                      {p.category === "Supplements"
                        ? "💊"
                        : p.category === "Equipment"
                        ? "🏋️"
                        : p.category === "Food"
                        ? "🥗"
                        : "👕"}
                    </span>
                  )}
                  <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-yellow-400/90 text-black text-[9px] font-black px-2 py-0.5 rounded-full">
                    <Star size={8} className="fill-black" /> Terlaris
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate group-hover:text-primary transition-colors duration-200">
                      {p.name}
                    </p>
                    <p className="text-xs text-primary font-bold mt-0.5">
                      Rp {p.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      addItem({
                        id: p.id,
                        name: p.name,
                        price: p.price,
                        category: p.category,
                        badge: p.badge,
                      })
                    }
                    className="shrink-0 text-[10px] font-bold px-3 py-1.5 rounded-lg bg-primary/15 text-primary border border-primary/30 hover:bg-primary/30 transition-colors"
                  >
                    + Tambah
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Search ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-6">
        <div className="relative max-w-md">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border/30 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </section>

      {/* ─── Catalog: shelf-by-category when browsing, focused grid when filtered ── */}
      <section className="max-w-7xl mx-auto px-6 pt-6 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <div className="text-4xl mb-4">🔍</div>
            <p>Tidak ada produk yang ditemukan untuk &quot;{search}&quot;</p>
          </div>
        ) : isShelfView ? (
          <div className="space-y-14">
            {Object.keys(CATEGORY_META).map((cat) => (
              <Shelf
                key={cat}
                category={cat}
                products={products.filter((p) => p.category === cat)}
                onAddToCart={handleAddToCart}
                onSeeAll={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">
                Showing <strong className="text-foreground">{filtered.length}</strong> products
              </span>
              {activeCategory !== "All" && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {activeCategory}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {/* First card: featured (spans 2 cols on large screens) */}
              {featuredProduct && (
                <ProductCard
                  key={featuredProduct.id}
                  product={featuredProduct}
                  className="lg:col-span-2 xl:col-span-2"
                  onAddToCart={() => handleAddToCart(featuredProduct)}
                />
              )}
              {restProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
