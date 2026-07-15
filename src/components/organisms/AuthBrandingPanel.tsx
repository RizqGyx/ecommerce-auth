import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

interface Props {
  heading: React.ReactNode;
  subheading: string;
  features: string[];
  featureIcon?: "dot" | "check";
  extra?: React.ReactNode;
}

const AuthBrandingPanel = ({ heading, subheading, features, featureIcon = "dot", extra }: Props) => (
  <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-background">
    <Image src="/Hero.png" alt="S-One Gym" fill className="object-cover opacity-40" priority />
    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
    <div className="absolute inset-0 hologram-lines opacity-30" />
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />

    <div className="relative z-10 flex flex-col justify-between p-12 w-full">
      <Link href="/" className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-md" />
          <Image src="/Icon.png" alt="S-One Gym" width={44} height={44} className="relative rounded-full" />
        </div>
        <div>
          <span className="block text-xl font-black gradient-text">S-One Gym</span>
          <p className="text-xs text-muted-foreground tracking-widest uppercase">Bukittinggi</p>
        </div>
      </Link>

      <div>
        <h1 className="text-4xl xl:text-5xl font-black mb-4 leading-tight">{heading}</h1>
        <p className="text-muted-foreground text-lg max-w-sm">{subheading}</p>
        {extra && <div className="mt-8">{extra}</div>}
      </div>

      <div className="space-y-3">
        {features.map((f) => (
          <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
            {featureIcon === "check"
              ? <CheckCircle size={14} className="text-primary shrink-0" />
              : <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            }
            {f}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AuthBrandingPanel;
