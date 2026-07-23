"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Category, Product } from "@/generated/prisma";

interface ProductFormProps {
  action: (formData: FormData) => void;
  categories: Category[];
  product?: Product;
}

export default function ProductForm({ action, categories, product }: ProductFormProps) {
  return (
    <form action={action} className="space-y-5 max-w-2xl">
      <div>
        <Label htmlFor="name">Nama Produk</Label>
        <Input id="name" name="name" defaultValue={product?.name} required />
      </div>

      <div>
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea id="description" name="description" rows={4} defaultValue={product?.description} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Harga (Rp)</Label>
          <Input id="price" name="price" type="number" min={0} defaultValue={product?.price} required />
        </div>
        <div>
          <Label htmlFor="originalPrice">Harga Coret (opsional)</Label>
          <Input
            id="originalPrice"
            name="originalPrice"
            type="number"
            min={0}
            defaultValue={product?.originalPrice ?? undefined}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="categoryId">Kategori</Label>
        <Select id="categoryId" name="categoryId" defaultValue={product?.categoryId ?? ""} required>
          <option value="" disabled>Pilih kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </Select>
      </div>

      {product && (
        <p className="text-sm text-muted-foreground">
          Rating: {product.rating.toFixed(1)} ⭐ ({product.reviewsCount} ulasan) — dihitung otomatis dari ulasan pelanggan.
        </p>
      )}

      <div>
        <Label htmlFor="badge">Badge (opsional)</Label>
        <Input id="badge" name="badge" placeholder="Best Seller, Sale, New..." defaultValue={product?.badge ?? ""} />
      </div>

      <div>
        <Label htmlFor="imageUrl">URL Gambar (opsional)</Label>
        <Input id="imageUrl" name="imageUrl" defaultValue={product?.imageUrl ?? ""} />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" variant="hero">Simpan</Button>
        <Button type="button" variant="ghost" asChild>
          <Link href="/admin/products">Batal</Link>
        </Button>
      </div>
    </form>
  );
}
