"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/8 via-background to-accent/8" />
      <div className="absolute inset-0 hologram-lines opacity-10" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass border border-red-500/20 mb-8">
          <AlertTriangle size={36} className="text-red-400" />
        </div>

        <h1 className="text-2xl lg:text-3xl font-black mb-3">
          Ada yang tidak beres di sisi kami
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-2 max-w-md mx-auto">
          Terjadi kesalahan tak terduga saat memuat halaman ini. Tim kami akan menindaklanjuti — coba muat ulang.
        </p>
        {error.digest && (
          <p className="text-xs font-mono text-muted-foreground/50 mb-8">Kode referensi: {error.digest}</p>
        )}
        {!error.digest && <div className="mb-8" />}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="hero" size="lg" onClick={() => reset()}>
            <RefreshCcw size={16} /> Coba Lagi
          </Button>
          <Button variant="neon" size="lg" asChild>
            <Link href="/">
              <Home size={16} /> Kembali ke Beranda
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
