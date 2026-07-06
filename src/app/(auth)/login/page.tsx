"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Zap, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthBrandingPanel from "@/components/organisms/AuthBrandingPanel";
import GoogleButton from "@/components/atoms/GoogleButton";

const SOCIAL_PROOF = (
  <div className="flex items-center gap-4">
    <div className="flex -space-x-2">
      {["BK", "RS", "AD", "FH"].map((initials) => (
        <div key={initials} className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 border-2 border-background flex items-center justify-center text-[10px] font-bold">
          {initials}
        </div>
      ))}
    </div>
    <div className="text-sm text-muted-foreground">
      <strong className="text-foreground">2,000+</strong> members training today
    </div>
  </div>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const res = await signIn("credentials", { email, password, redirect: false });

    setIsLoading(false);
    if (res?.error) {
      setError("Email atau password salah.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex">
      <AuthBrandingPanel
        heading={<>Welcome <br /><span className="gradient-text">Back.</span></>}
        subheading="Your body is waiting. Let's get back to work."
        features={["QR code gym access", "Book classes instantly", "Track your progress", "Shop supplements & gear"]}
        extra={SOCIAL_PROOF}
      />

      {/* Right — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/Icon.png" alt="S-One Gym" width={40} height={40} className="rounded-full" />
              <div>
                <h1 className="text-lg font-black gradient-text">S-One Gym</h1>
                <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Bukittinggi</p>
              </div>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black mb-2">Sign In</h2>
            <p className="text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:text-primary/80 transition-colors font-semibold">Create one</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-card border border-border/30 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium">Password</label>
                <Link href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                  className="w-full pl-9 pr-10 py-3 rounded-xl bg-card border border-border/30 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all" />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded accent-primary" />
              <label htmlFor="remember" className="text-sm text-muted-foreground">Remember me for 30 days</label>
            </div>

            <Button type="submit" variant="hero" className="w-full py-3 h-auto text-base" disabled={isLoading}>
              {isLoading
                ? <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />Signing in...</div>
                : <><Zap size={18} /> Sign In</>}
            </Button>

            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-border/30" />
              <span className="text-xs text-muted-foreground">or continue with</span>
              <div className="flex-1 h-px bg-border/30" />
            </div>

            <GoogleButton label="Continue with Google" />
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            By signing in you agree to our{" "}
            <Link href="#" className="text-primary hover:underline">Terms of Service</Link>{" "}and{" "}
            <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
