import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/molecules/SectionHeader";
import PricingCard from "@/components/molecules/PricingCard";
import { prisma } from "@/lib/prisma";
import { toPricingCardData } from "@/lib/serializers";

const MembershipPreviewSection = async () => {
  const plans = await prisma.membershipPlan.findMany({ orderBy: { price: "asc" } });

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="Paket Membership"
          title={<>Pilih <span className="gradient-text">Jalanmu</span></>}
          subtitle="Tanpa kontrak jangka panjang. Batalkan kapan saja. Mulai transformasimu hari ini."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              {...toPricingCardData(plan)}
              compact
              href="/membership"
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/membership"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Bandingkan semua fitur secara detail <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MembershipPreviewSection;
