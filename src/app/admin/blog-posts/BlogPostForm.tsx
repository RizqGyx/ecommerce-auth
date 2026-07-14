"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/generated/prisma";

interface BlogPostFormProps {
  action: (formData: FormData) => void;
  post?: BlogPost;
}

export default function BlogPostForm({ action, post }: BlogPostFormProps) {
  return (
    <form action={action} className="space-y-5 max-w-2xl">
      <div>
        <Label htmlFor="title">Judul</Label>
        <Input id="title" name="title" defaultValue={post?.title} required />
      </div>

      <div>
        <Label htmlFor="slug">Slug (URL)</Label>
        <Input id="slug" name="slug" placeholder="5-tips-maximize-gym-session" defaultValue={post?.slug} required />
      </div>

      <div>
        <Label htmlFor="excerpt">Ringkasan</Label>
        <Textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt} required />
      </div>

      <div>
        <Label htmlFor="content">Konten Artikel</Label>
        <Textarea id="content" name="content" rows={12} defaultValue={post?.content} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="authorName">Nama Penulis</Label>
          <Input id="authorName" name="authorName" defaultValue={post?.authorName} required />
        </div>
        <div>
          <Label htmlFor="readTime">Waktu Baca (menit)</Label>
          <Input id="readTime" name="readTime" type="number" min={1} defaultValue={post?.readTime ?? 5} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Kategori</Label>
          <Select id="category" name="category" defaultValue={post?.category ?? "NEWS"} required>
            <option value="NEWS">News</option>
            <option value="TIPS">Tips</option>
            <option value="NUTRITION">Nutrition</option>
            <option value="WORKOUT">Workout</option>
            <option value="EVENTS">Events</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="imageUrl">URL Gambar (opsional)</Label>
          <Input id="imageUrl" name="imageUrl" defaultValue={post?.imageUrl ?? ""} />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked={post?.published ?? true} className="w-4 h-4 rounded accent-primary" />
          Publikasikan
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={post?.featured} className="w-4 h-4 rounded accent-primary" />
          Featured Article
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" variant="hero">Simpan</Button>
        <Button type="button" variant="ghost" asChild>
          <Link href="/admin/blog-posts">Batal</Link>
        </Button>
      </div>
    </form>
  );
}
