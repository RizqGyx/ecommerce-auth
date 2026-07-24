"use client";

import { useState } from "react";
import MidtransPayButton from "@/components/organisms/MidtransPayButton";
import { createMembershipPaymentIntent } from "./actions";

const DURATIONS = [1, 3, 6, 12];

interface Props {
  planId: string;
  planName: string;
  price: number;
  variant: "hero" | "neon" | "glass";
  buttonClassName?: string;
}

export default function MembershipPurchaseButton({ planId, planName, price, variant, buttonClassName }: Props) {
  const [months, setMonths] = useState(1);
  const total = price * months;

  const handleCreateIntent = () => createMembershipPaymentIntent(planId, months);

  return (
    <div className="mb-8">
      <div className="flex gap-1.5 mb-3">
        {DURATIONS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMonths(m)}
            className={`flex-1 text-xs font-semibold py-1.5 rounded-lg border transition-colors ${
              months === m
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/30 text-muted-foreground hover:border-border/50"
            }`}
          >
            {m} bln
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mb-3 text-center">
        Total: <span className="font-bold text-foreground">Rp {total.toLocaleString("id-ID")}</span>
      </p>
      <MidtransPayButton
        createIntent={handleCreateIntent}
        label={`Pilih ${planName}`}
        variant={variant}
        buttonClassName={buttonClassName}
      />
    </div>
  );
}
