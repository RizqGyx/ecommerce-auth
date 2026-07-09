"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId") ?? "S1G-XXXXXXX";
  const total = Number(params.get("total") ?? 0);
  const method = params.get("method") ?? "Pembayaran";

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Success icon */}
        <div className="relative mb-6 inline-block">
          <div className="w-24 h-24 rounded-full bg-green-400/10 border-2 border-green-400/30 flex items-center justify-center mx-auto">
            <CheckCircle size={48} className="text-green-400" />
          </div>
          <div className="absolute inset-0 rounded-full animate-ping bg-green-400/10" />
        </div>

        <h1 className="text-3xl font-black mb-2">Pesanan Berhasil! 🎉</h1>
        <p className="text-muted-foreground mb-8">
          Pembayaran via <strong className="text-foreground">{method}</strong> telah dikonfirmasi.
          Tim S-One Store akan segera memproses pesananmu.
        </p>

        {/* Order card */}
        <div className="glass rounded-2xl border border-green-400/20 p-6 text-left mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-green-400/10">
              <Package size={20} className="text-green-400" />
            </div>
            <div>
              <div className="font-bold">Nomor Pesanan</div>
              <div className="font-mono text-primary text-sm">{orderId}</div>
            </div>
          </div>

          <div className="space-y-2 text-sm border-t border-border/20 pt-4">
            <div className="flex justify-between text-muted-foreground">
              <span>Metode Pembayaran</span>
              <span className="text-foreground font-medium">{method}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Total Dibayar</span>
              <span className="text-primary font-bold">Rp {total.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Status</span>
              <span className="text-green-400 font-semibold">Dikonfirmasi ✓</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Estimasi Kirim</span>
              <span className="text-foreground">3–5 hari kerja</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="hero" className="flex-1" asChild>
            <Link href="/orders">
              Lacak Pesanan <ArrowRight size={16} />
            </Link>
          </Button>
          <Button variant="neon" className="flex-1" asChild>
            <Link href="/shop">
              <ShoppingBag size={16} /> Belanja Lagi
            </Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          Invoice dikirim ke email terdaftar. Cek spam jika tidak muncul dalam 5 menit.
        </p>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center"><div className="text-muted-foreground">Memuat...</div></div>}>
      <SuccessContent />
    </Suspense>
  );
}
