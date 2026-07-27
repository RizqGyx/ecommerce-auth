import { UserPlus, CreditCard, ScanLine, Dumbbell, ArrowRight } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import SectionHeader from "@/components/molecules/SectionHeader";

interface Step {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
  iconColor: string;
  iconBg: string;
  border: string;
}

const STEPS: Step[] = [
  { icon: UserPlus, step: "01", title: "Buat Akun", description: "Daftar online atau datang langsung. Pilih paket membership yang sesuai dengan tujuan dan gaya hidupmu.", iconColor: "text-primary", iconBg: "bg-primary/10", border: "border-primary/30" },
  { icon: CreditCard, step: "02", title: "Dapatkan Kartu Member", description: "Terima kartu membership digital dengan QR code unik — kunci aksesmu ke seluruh fasilitas S-One.", iconColor: "text-accent", iconBg: "bg-accent/10", border: "border-accent/30" },
  { icon: ScanLine, step: "03", title: "Scan & Masuk", description: "Tempelkan ponselmu di gerbang masuk. Sistem kami langsung memverifikasi membershipmu dan mencatat kunjunganmu.", iconColor: "text-green-400", iconBg: "bg-green-400/10", border: "border-green-400/30" },
  { icon: Dumbbell, step: "04", title: "Latihan & Transformasi", description: "Akses semua alat, ikuti kelas grup, booking personal training, dan pantau progresmu.", iconColor: "text-yellow-400", iconBg: "bg-yellow-400/10", border: "border-yellow-400/30" },
];

const HowItWorksSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="Cara Memulai"
          title={<>Cara <span className="gradient-text">Kerjanya</span></>}
          subtitle="Dari daftar hingga sesi pertamamu dalam empat langkah sederhana. Tanpa kontrak rumit, tanpa biaya tersembunyi."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0 lg:text-center"
              >
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute top-10 left-1/2 w-full items-center justify-end z-0">
                    <div className="w-full h-px bg-gradient-to-r from-border/50 to-transparent ml-12" />
                    <ArrowRight size={14} className="text-muted-foreground/50 absolute right-0 translate-x-2" />
                  </div>
                )}

                <div className="relative z-10 shrink-0">
                  <div className={`w-20 h-20 rounded-2xl ${step.iconBg} border ${step.border} flex items-center justify-center hover:scale-105 transition-transform duration-300`}>
                    <Icon size={32} className={step.iconColor} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-[10px] font-black text-muted-foreground">
                    {step.step}
                  </div>
                </div>

                <div className="lg:mt-6 lg:px-4">
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
