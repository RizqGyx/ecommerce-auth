"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { ClassType } from "@/generated/prisma";

interface ClassTypeFormProps {
  action: (formData: FormData) => void;
  classType?: ClassType;
}

export default function ClassTypeForm({ action, classType }: ClassTypeFormProps) {
  return (
    <form action={action} className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nama Kelas</Label>
          <Input id="name" name="name" defaultValue={classType?.name} required />
        </div>
        <div>
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input id="slug" name="slug" placeholder="zumba" defaultValue={classType?.slug} required />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea id="description" name="description" rows={4} defaultValue={classType?.description} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration">Durasi (menit)</Label>
          <Input id="duration" name="duration" type="number" min={1} defaultValue={classType?.duration} required />
        </div>
        <div>
          <Label htmlFor="level">Level</Label>
          <Select id="level" name="level" defaultValue={classType?.level ?? "ALL_LEVELS"} required>
            <option value="ALL_LEVELS">All Levels</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="icon">Icon (emoji)</Label>
          <Input id="icon" name="icon" placeholder="🕺" defaultValue={classType?.icon ?? ""} />
        </div>
        <div>
          <Label htmlFor="color">Gradient Tailwind</Label>
          <Input id="color" name="color" placeholder="from-pink-500 to-rose-600" defaultValue={classType?.color ?? ""} />
        </div>
        <div>
          <Label htmlFor="colorSolid">Warna Solid</Label>
          <Input id="colorSolid" name="colorSolid" placeholder="text-pink-400" defaultValue={classType?.colorSolid ?? ""} />
        </div>
      </div>

      <div>
        <Label htmlFor="benefits">Manfaat (satu per baris)</Label>
        <Textarea
          id="benefits"
          name="benefits"
          rows={4}
          defaultValue={classType?.benefits.join("\n") ?? ""}
          placeholder={"Burns 400-600 calories\nImproves coordination"}
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" variant="hero">Simpan</Button>
        <Button type="button" variant="ghost" asChild>
          <Link href="/admin/classes">Batal</Link>
        </Button>
      </div>
    </form>
  );
}
