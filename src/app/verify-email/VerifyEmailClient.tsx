"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { MailCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthBrandingPanel from "@/components/organisms/AuthBrandingPanel";
import { verifyOtpCode, resendOtpCode } from "./actions";

interface Props {
  email: string;
  callbackUrl: string;
}

export default function VerifyEmailClient({ email, callbackUrl }: Props) {
  const router = useRouter();
  const { update } = useSession();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await verifyOtpCode(code);

    if (!result.success) {
      setIsLoading(false);
      setError(result.error ?? "Kode tidak valid.");
      return;
    }

    await update({ isVerified: true });
    router.push(callbackUrl);
    router.refresh();
  };

  const handleResend = async () => {
    setResendState("sending");
    const result = await resendOtpCode();
    setResendState(result.success ? "sent" : "idle");
    if (!result.success) setError(result.error ?? "Gagal mengirim ulang kode.");
  };

  return (
    <div className="min-h-screen flex">
      <AuthBrandingPanel
        heading={<>Almost <br /><span className="gradient-text">There.</span></>}
        subheading="Satu langkah lagi untuk mulai booking kelas, akses QR, dan belanja di S-One."
        features={[
          "Kode berlaku beberapa menit — cek folder spam juga",
          "Setelah verifikasi, akunmu langsung aktif penuh",
          "Butuh kode baru? Tinggal klik kirim ulang",
        ]}
      />

      {/* Right — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md text-center">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/Icon.png" alt="S-One Gym" width={40} height={40} className="rounded-full" />
              <span className="text-lg font-black gradient-text">S-One Gym</span>
            </Link>
          </div>

          <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-6">
            <MailCheck size={28} className="text-primary" />
          </div>

          <h1 className="text-3xl font-black mb-2">Verifikasi Email</h1>
          <p className="text-muted-foreground mb-8 text-sm">
            Kami sudah mengirim kode 6 digit ke <strong className="text-foreground">{email}</strong>. Masukkan
            kodenya untuk mengaktifkan akunmu.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                {error}
              </div>
            )}
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              required
              className="w-full text-center text-2xl tracking-[0.5em] font-bold py-3 rounded-xl bg-card border border-border/30 placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
            />
            <Button type="submit" variant="hero" className="w-full py-3 h-auto text-base" disabled={isLoading || code.length !== 6}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                  Memverifikasi...
                </div>
              ) : (
                <>
                  Verifikasi <Zap size={16} />
                </>
              )}
            </Button>
          </form>

          <button
            type="button"
            onClick={handleResend}
            disabled={resendState === "sending"}
            className="mt-6 text-sm text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
          >
            {resendState === "sent" ? "Kode baru sudah dikirim" : resendState === "sending" ? "Mengirim..." : "Kirim ulang kode"}
          </button>
        </div>
      </div>
    </div>
  );
}
