import Link from "next/link";
import { Compass, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/8" />
      <div className="absolute inset-0 hologram-lines opacity-10" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none animate-float" />

      <div className="relative z-10 max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass border border-primary/20 mb-8">
          <Compass size={36} className="text-primary animate-spin-slow" />
        </div>

        <div className="text-7xl lg:text-8xl font-black gradient-text leading-none mb-4">404</div>
        <h1 className="text-2xl lg:text-3xl font-black mb-3">
          Halaman ini belum ada di peta kami
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
          Link yang kamu tuju mungkin sudah dipindah, dihapus, atau memang salah ketik.
          Mari kembali ke jalur yang benar.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="hero" size="lg" asChild>
            <Link href="/">
              <Home size={16} /> Kembali ke Beranda
            </Link>
          </Button>
          <Button variant="neon" size="lg" asChild>
            <Link href="/schedule">
              Lihat Jadwal Kelas <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
