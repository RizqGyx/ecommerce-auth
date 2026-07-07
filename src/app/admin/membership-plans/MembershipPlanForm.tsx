"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { MembershipPlan } from "@/generated/prisma";
import { featuresToText } from "./utils";

interface MembershipPlanFormProps {
  action: (formData: FormData) => void;
  plan?: MembershipPlan;
}

export default function MembershipPlanForm({ action, plan }: MembershipPlanFormProps) {
  return (
    <form action={action} className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nama Paket</Label>
          <Input id="name" name="name" defaultValue={plan?.name} required />
        </div>
        <div>
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input id="slug" name="slug" placeholder="premium" defaultValue={plan?.slug} required />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Tagline</Label>
        <Input id="description" name="description" placeholder="Most Popular Choice" defaultValue={plan?.description} required />
      </div>

      <div>
        <Label htmlFor="price">Harga per Bulan (Rp)</Label>
        <Input id="price" name="price" type="number" min={0} defaultValue={plan?.price} required />
      </div>

      <div>
        <Label htmlFor="features">
          Fitur (satu per baris — awali dengan &quot;+&quot; untuk termasuk, &quot;-&quot; untuk tidak termasuk)
        </Label>
        <Textarea
          id="features"
          name="features"
          rows={8}
          defaultValue={plan ? featuresToText(plan.features) : ""}
          placeholder={"+ Gym floor access (6AM–10PM)\n+ 2 group classes per week\n- Sauna access"}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="color">Gradient Tailwind (opsional)</Label>
          <Input id="color" name="color" placeholder="from-primary/80 to-accent/80" defaultValue={plan?.color ?? ""} />
        </div>
        <div>
          <Label htmlFor="borderColor">Border Color (opsional)</Label>
          <Input id="borderColor" name="borderColor" placeholder="border-primary/50" defaultValue={plan?.borderColor ?? ""} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="popular" defaultChecked={plan?.popular} className="w-4 h-4 rounded accent-primary" />
        Tandai sebagai Most Popular
      </label>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" variant="hero">Simpan</Button>
        <Button type="button" variant="ghost" asChild>
          <Link href="/admin/membership-plans">Batal</Link>
        </Button>
      </div>
    </form>
  );
}
