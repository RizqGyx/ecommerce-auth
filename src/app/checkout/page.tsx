"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, MapPin, Package, CreditCard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { COURIERS } from "@/lib/data";
import AddressForm, { type AddressData } from "@/components/molecules/checkout/AddressForm";
import OrderReview from "@/components/molecules/checkout/OrderReview";
import PaymentStep from "@/components/molecules/checkout/PaymentStep";
import CheckoutSummary from "@/components/molecules/checkout/CheckoutSummary";
import { createShopPaymentIntent } from "./actions";

type Step = "address" | "review" | "payment";

const STEP_META: Record<Step, { label: string; icon: typeof MapPin }> = {
  address: { label: "Alamat Pengiriman", icon: MapPin },
  review:  { label: "Review Pesanan",    icon: Package },
  payment: { label: "Pembayaran",        icon: CreditCard },
};
const STEPS: Step[] = ["address", "review", "payment"];

const DEFAULT_ADDRESS: AddressData = {
  recipient: "Ahmad Berzki",
  phone:     "+62 812-3456-7890",
  street:    "Jl. Veteran No. 15",
  city:      "Bukittinggi",
  province:  "Sumatera Barat",
  postal:    "26112",
  notes:     "",
};

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  const [step, setStep]         = useState<Step>("address");
  const [address, setAddress]   = useState<AddressData>(DEFAULT_ADDRESS);
  const [courierId, setCourierId] = useState(COURIERS[0].id);

  const selectedCourier = COURIERS.find((c) => c.id === courierId) ?? COURIERS[0];
  const total = subtotal + selectedCourier.cost;

  const handleCreateIntent = () =>
    createShopPaymentIntent(items.map((i) => ({ productId: i.id, quantity: i.quantity })));

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Keranjangmu kosong.</p>
          <Button variant="hero" asChild><Link href="/shop">Ke Shop</Link></Button>
        </div>
      </div>
    );
  }

  const stepIndex = STEPS.indexOf(step);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-black mb-8"><span className="gradient-text">Checkout</span></h1>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => {
            const Icon = STEP_META[s].icon;
            const done   = STEPS.indexOf(s) < stepIndex;
            const active = s === step;
            return (
              <div key={s} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border-2 transition-all ${
                    done ? "bg-primary border-primary" : active ? "border-primary text-primary" : "border-border/30 text-muted-foreground/40"
                  }`}>
                    {done ? <Check size={14} className="text-primary-foreground" /> : <Icon size={14} />}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${active ? "text-foreground" : done ? "text-primary" : "text-muted-foreground/40"}`}>
                    {STEP_META[s].label}
                  </span>
                </div>
                {i < STEPS.length - 1 && <ChevronRight size={14} className="text-border/40 shrink-0 mx-1" />}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === "address" && (
              <AddressForm
                address={address} courierId={courierId}
                onAddress={setAddress} onCourier={setCourierId}
                onNext={() => setStep("review")}
              />
            )}
            {step === "review" && (
              <OrderReview
                items={items} address={address}
                courierName={selectedCourier.name} courierCost={selectedCourier.cost}
                onBack={() => setStep("address")} onNext={() => setStep("payment")}
              />
            )}
            {step === "payment" && (
              <PaymentStep
                subtotal={subtotal} courierCost={selectedCourier.cost}
                total={total}
                courierName={selectedCourier.name} createIntent={handleCreateIntent}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            <CheckoutSummary
              items={items} courierCost={selectedCourier.cost}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
