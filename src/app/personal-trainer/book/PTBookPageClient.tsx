"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, CheckCircle, ArrowRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Coach } from "@/generated/prisma";
import { PT_PACKAGES } from "@/lib/data";
import PaymentMethodCard, {
  PAYMENT_METHODS,
  CATEGORY_LABELS,
} from "@/components/molecules/PaymentMethodCard";

const PT_PAYMENT_CATEGORIES = ["qris", "ewallet", "bank", "card"] as const;

interface Props {
  pts: Coach[];
  trainerParam: string;
  packageParam: string;
}

export default function PTBookPageClient({ pts, trainerParam, packageParam }: Props) {
  const router = useRouter();

  const [selectedTrainerId, setSelectedTrainerId] = useState(
    trainerParam || (pts[0]?.id ?? "")
  );
  const [selectedPackageId, setSelectedPackageId] = useState(() => {
    const found = PT_PACKAGES.find(
      (p) => p.name.toLowerCase() === packageParam.toLowerCase()
    );
    return found?.id ?? "transform";
  });
  const [paymentId, setPaymentId] = useState("gopay");

  const selectedTrainer = pts.find((c) => c.id === selectedTrainerId) ?? pts[0];
  const selectedPackage = PT_PACKAGES.find((p) => p.id === selectedPackageId) ?? PT_PACKAGES[1];
  const selectedPayment = PAYMENT_METHODS.find((p) => p.id === paymentId) ?? PAYMENT_METHODS[0];

  const fee = selectedPayment.fee ?? 0;
  const total = selectedPackage.price + fee;

  const grouped = PAYMENT_METHODS.reduce<Record<string, typeof PAYMENT_METHODS>>(
    (acc, m) => {
      if (!acc[m.category]) acc[m.category] = [];
      acc[m.category].push(m);
      return acc;
    },
    {}
  );

  if (!selectedTrainer) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Belum ada personal trainer tersedia.</p>
          <Button variant="hero" asChild><Link href="/personal-trainer">Kembali</Link></Button>
        </div>
      </div>
    );
  }

  const handleBook = () => {
    const ref = `PT-${Date.now().toString(36).toUpperCase()}`;
    router.push(
      `/payment?${new URLSearchParams({
        category: selectedPayment.category,
        method: selectedPayment.id,
        methodName: selectedPayment.name,
        total: String(total),
        fee: String(fee),
        type: "pt",
        ref,
        coachId: selectedTrainer.id,
        packageId: selectedPackage.id,
        trainerName: selectedTrainer.name,
        package: selectedPackage.name,
      })}`
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Link
          href="/personal-trainer"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Kembali ke Personal Trainer
        </Link>

        <h1 className="text-3xl font-black mb-8">
          Book <span className="gradient-text">Personal Trainer</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-5">
            {/* Trainer selection */}
            <div className="glass rounded-2xl border border-border/20 p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <User size={16} className="text-primary" /> Pilih Personal Trainer
              </h3>
              <div className="space-y-3">
                {pts.map((pt) => {
                  const initials = pt.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("");
                  return (
                    <button
                      key={pt.id}
                      onClick={() => setSelectedTrainerId(pt.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                        selectedTrainerId === pt.id
                          ? "border-primary/50 bg-primary/5"
                          : "border-border/20 hover:border-border/40 hover:bg-secondary/20"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center shrink-0">
                        <span className="font-bold text-sm gradient-text">{initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{pt.name}</p>
                        <p className="text-xs text-muted-foreground">{pt.title}</p>
                      </div>
                      {pt.pricePerSession && (
                        <span className="text-xs text-primary font-semibold shrink-0">
                          Rp {pt.pricePerSession.toLocaleString("id-ID")}/sesi
                        </span>
                      )}
                      {selectedTrainerId === pt.id && (
                        <CheckCircle size={16} className="text-primary shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Package selection */}
            <div className="glass rounded-2xl border border-border/20 p-6">
              <h3 className="font-bold mb-4">Pilih Paket</h3>
              <div className="space-y-3">
                {PT_PACKAGES.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                      selectedPackageId === pkg.id
                        ? "border-primary/50 bg-primary/5"
                        : "border-border/20 hover:border-border/40 hover:bg-secondary/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-sm">{pkg.name}</span>
                        {pkg.popular && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                            Terpopuler
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {pkg.sessions} sesi · valid {pkg.validDays} hari
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-black text-primary">
                        Rp {pkg.price.toLocaleString("id-ID")}
                      </span>
                      {selectedPackageId === pkg.id && (
                        <CheckCircle size={16} className="text-primary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment method */}
            <div className="glass rounded-2xl border border-border/20 p-6">
              <h3 className="font-bold flex items-center gap-2 mb-5">
                <CreditCard size={18} className="text-primary" /> Metode Pembayaran
              </h3>
              <div className="space-y-5">
                {PT_PAYMENT_CATEGORIES.map((cat) =>
                  grouped[cat] ? (
                    <div key={cat}>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                        {CATEGORY_LABELS[cat]}
                      </div>
                      <div className="space-y-2">
                        {grouped[cat].map((m) => (
                          <PaymentMethodCard
                            key={m.id}
                            method={m}
                            selected={paymentId === m.id}
                            onSelect={setPaymentId}
                          />
                        ))}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl border border-border/20 p-5 sticky top-24">
              <h3 className="font-bold mb-4">Ringkasan</h3>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trainer</span>
                  <span className="font-semibold">{selectedTrainer?.name ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Paket</span>
                  <span className="font-semibold">{selectedPackage.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sesi</span>
                  <span className="font-semibold">{selectedPackage.sessions} × 60 menit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valid</span>
                  <span className="font-semibold">{selectedPackage.validDays} hari</span>
                </div>
              </div>

              <div className="border-t border-border/20 pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Harga paket</span>
                  <span>Rp {selectedPackage.price.toLocaleString("id-ID")}</span>
                </div>
                {fee > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Biaya admin</span>
                    <span>Rp {fee.toLocaleString("id-ID")}</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-lg pt-2 border-t border-border/20">
                  <span>Total</span>
                  <span className="gradient-text">Rp {total.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-secondary/30">
                <p className="text-xs font-semibold mb-2">Termasuk dalam paket:</p>
                {selectedPackage.features.map((f) => (
                  <div key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <CheckCircle size={10} className="text-primary shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <Button variant="hero" size="lg" className="w-full mt-4 h-12" onClick={handleBook}>
                Bayar Sekarang <ArrowRight size={16} />
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-3">
                🔒 Aman · Diproses oleh Midtrans
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
