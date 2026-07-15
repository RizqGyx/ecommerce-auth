"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Coach } from "@/generated/prisma";

interface CoachFormProps {
  action: (formData: FormData) => void;
  coach?: Coach;
}

export default function CoachForm({ action, coach }: CoachFormProps) {
  return (
    <form action={action} className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nama</Label>
          <Input id="name" name="name" defaultValue={coach?.name} required />
        </div>
        <div>
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input id="slug" name="slug" placeholder="rina-sari" defaultValue={coach?.slug} required />
        </div>
      </div>

      <div>
        <Label htmlFor="title">Jabatan</Label>
        <Input id="title" name="title" placeholder="Zumba & Poundfit Instructor" defaultValue={coach?.title} required />
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" name="bio" rows={4} defaultValue={coach?.bio} required />
      </div>

      <div>
        <Label htmlFor="imageUrl">URL Foto</Label>
        <Input id="imageUrl" name="imageUrl" placeholder="/coaches/rina.jpg" defaultValue={coach?.imageUrl} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="specialties">Spesialisasi (satu per baris)</Label>
          <Textarea id="specialties" name="specialties" rows={3} defaultValue={coach?.specialties.join("\n") ?? ""} />
        </div>
        <div>
          <Label htmlFor="certifications">Sertifikasi (satu per baris)</Label>
          <Textarea id="certifications" name="certifications" rows={3} defaultValue={coach?.certifications.join("\n") ?? ""} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="experience">Pengalaman (tahun)</Label>
          <Input id="experience" name="experience" type="number" min={0} defaultValue={coach?.experience} required />
        </div>
        <div>
          <Label htmlFor="instagram">Instagram (opsional)</Label>
          <Input id="instagram" name="instagram" placeholder="@rina.sari.fit" defaultValue={coach?.instagram ?? ""} />
        </div>
      </div>

      <div>
        <Label htmlFor="achievements">Pencapaian (opsional)</Label>
        <Input id="achievements" name="achievements" placeholder="Best Instructor Award 2023" defaultValue={coach?.achievements ?? ""} />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={coach?.featured} className="w-4 h-4 rounded accent-primary" />
          Featured Coach
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isPersonalTrainer" defaultChecked={coach?.isPersonalTrainer} className="w-4 h-4 rounded accent-primary" />
          Personal Trainer
        </label>
      </div>

      <div>
        <Label htmlFor="pricePerSession">Harga per Sesi PT (opsional, Rp)</Label>
        <Input
          id="pricePerSession"
          name="pricePerSession"
          type="number"
          min={0}
          defaultValue={coach?.pricePerSession ?? undefined}
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" variant="hero">Simpan</Button>
        <Button type="button" variant="ghost" asChild>
          <Link href="/admin/coaches">Batal</Link>
        </Button>
      </div>
    </form>
  );
}
