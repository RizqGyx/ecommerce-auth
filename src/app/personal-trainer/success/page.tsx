"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Dumbbell, User, Package2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function PTSuccessContent() {
  const params = useSearchParams();
  const packageName = params.get("package") ?? "Transform";
  const trainerName = params.get("trainer") ?? "Coach";
  const total = Number(params.get("total") ?? 0);
  const method = params.get("method") ?? "Pembayaran";
  const ref = params.get("ref") ?? `PT-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-6 inline-block">
          <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto">
            <CheckCircle size={48} className="text-primary" />
          </div>
          <div className="absolute inset-0 rounded-full animate-ping bg-primary/5" />
        </div>

        <h1 className="text-3xl font-black mb-2">Booking PT Berhasil! 🎉</h1>
        <p className="text-muted-foreground mb-8">
          Paket <strong className="text-foreground">{packageName}</strong> bersama{" "}
          <strong className="text-foreground">{trainerName}</strong> telah aktif.
          Trainer kamu akan menghubungi dalam 24 jam untuk menjadwalkan sesi pertama.
        </p>

        <div className="glass rounded-2xl border border-primary/20 p-6 text-left mb-6">
          <div className="text-xs font-bold tracking-widest uppercase text-primary/60 mb-1">
            Referensi Booking
          </div>
          <div className="font-mono font-black text-lg gradient-text mb-5">{ref}</div>

          <div className="space-y-3">
            {[
              { icon: Dumbbell, label: "Paket", value: packageName },
              { icon: User, label: "Trainer", value: trainerName },
              { icon: Package2, label: "Sesi", value: "Akan dijadwalkan bersama trainer" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 text-sm">
                <Icon size={15} className="text-primary shrink-0" />
                <span className="text-muted-foreground">{label}</span>
                <span className="font-semibold ml-auto text-right">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border/20 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Metode Bayar</span>
              <span className="text-foreground font-medium">{method}</span>
            </div>
            <div className="flex justify-between font-black">
              <span>Total Dibayar</span>
              <span className="text-primary">Rp {total.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Button variant="hero" className="flex-1" asChild>
            <Link href="/dashboard">
              Ke Dashboard <ArrowRight size={16} />
            </Link>
          </Button>
          <Button variant="neon" className="flex-1" asChild>
            <Link href="/schedule">Lihat Jadwal</Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Detail paket dikirim ke email dan WhatsApp terdaftar.
        </p>
      </div>
    </div>
  );
}

export default function PTSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="text-muted-foreground">Memuat...</div>
        </div>
      }
    >
      <PTSuccessContent />
    </Suspense>
  );
}
