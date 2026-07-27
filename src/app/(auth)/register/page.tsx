"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Zap, User, Mail, Lock, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthBrandingPanel from "@/components/organisms/AuthBrandingPanel";
import GoogleButton from "@/components/atoms/GoogleButton";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: form.password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(data.error ?? "Gagal membuat akun.");
      return;
    }

    await signIn("credentials", { email: form.email, password: form.password, redirect: false });
    router.push("/verify-email");
    router.refresh();
  };

  const inputClass = "w-full pl-9 pr-4 py-3 rounded-xl bg-card border border-border/30 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all";

  return (
    <div className="min-h-screen flex">
      {/* Left — Form (mirrored from Login: this is a decision page, form leads) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/Icon.png" alt="S-One Gym" width={40} height={40} className="rounded-full" />
              <span className="text-lg font-black gradient-text">S-One Gym</span>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black mb-2">Buat Akun</h2>
            <p className="text-muted-foreground">
              Sudah jadi member?{" "}
              <Link href="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">Masuk</Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1.5">Nama Lengkap</label>
              <div className="relative"><User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Nama lengkapmu" required className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <div className="relative"><Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Telepon / WhatsApp</label>
              <div className="relative"><Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+62 8xx-xxxx-xxxx" required className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="Min. 8 karakter" required minLength={8}
                  className="w-full pl-9 pr-10 py-3 rounded-xl bg-card border border-border/30 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all" />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="mt-2 space-y-1">
                  {[
                    { label: "Minimal 8 karakter", met: form.password.length >= 8 },
                    { label: "Mengandung huruf & angka", met: /[a-zA-Z]/.test(form.password) && /[0-9]/.test(form.password) },
                  ].map(({ label, met }) => (
                    <div key={label} className={`flex items-center gap-1.5 text-xs transition-colors ${met ? "text-primary" : "text-muted-foreground"}`}>
                      <span className={`flex items-center justify-center w-3.5 h-3.5 rounded-full border transition-colors ${met ? "bg-primary border-primary" : "border-border/50"}`}>
                        {met && <Check size={9} className="text-primary-foreground" />}
                      </span>
                      {label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button type="submit" variant="hero" className="w-full py-3 h-auto text-base" disabled={isLoading}>
              {isLoading
                ? <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />Membuat akun...</div>
                : <>Buat Akun <Zap size={16} /></>}
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border/30" /><span className="text-xs text-muted-foreground">atau</span><div className="flex-1 h-px bg-border/30" />
            </div>
            <GoogleButton label="Daftar dengan Google" />
          </form>
        </div>
      </div>

      {/* Right — Branding (mirrored + more vivid: registering is a bigger decision than signing back in) */}
      <AuthBrandingPanel
        heading={<>Perjalananmu <br /><span className="gradient-text">Dimulai di Sini.</span></>}
        subheading="Bergabung dengan 2.000+ member yang memilih mentransformasi tubuh dan pikiran mereka di S-One."
        features={[
          "Minggu pertama gratis — tanpa kartu kredit",
          "Kartu member QR code langsung terbit",
          "Akses semua kelas grup seketika",
          "Batalkan kapan saja, tanpa ribet",
        ]}
        featureIcon="check"
        mood="ambitious"
        mirrored
      />
    </div>
  );
}
