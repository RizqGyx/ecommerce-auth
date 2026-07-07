import Link from "next/link";
import { Check, X, Shield, Zap, Star, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toPricingCardData } from "@/lib/serializers";
import FAQAccordion from "./FAQAccordion";
import { subscribeToPlan } from "./actions";

const COMPARISON_FEATURES = [
  { label: "Gym Floor Access", starter: "6AM–10PM", premium: "24/7", elite: "24/7" },
  { label: "Group Classes", starter: "2 per week", premium: "Unlimited", elite: "Unlimited" },
  { label: "Locker Room", starter: true, premium: true, elite: true },
  { label: "Towel Service", starter: false, premium: true, elite: true },
  { label: "Sauna Access", starter: false, premium: "3x / week", elite: "Unlimited" },
  { label: "Personal Training", starter: false, premium: "1x / month", elite: "4x / month" },
  { label: "Fitness Assessment", starter: "Monthly", premium: "Bi-weekly", elite: "Weekly" },
  { label: "Priority Booking", starter: false, premium: true, elite: true },
  { label: "Nutrition Consultation", starter: false, premium: false, elite: "Monthly" },
  { label: "Guest Passes", starter: false, premium: "1 / month", elite: "3 / month" },
  { label: "Member App Access", starter: true, premium: true, elite: true },
];

function renderCell(value: boolean | string | undefined) {
  if (value === true)
    return (
      <span className="flex items-center justify-center">
        <Check size={16} className="text-primary" />
      </span>
    );
  if (value === false)
    return (
      <span className="flex items-center justify-center">
        <X size={16} className="text-muted-foreground/30" />
      </span>
    );
  return <span className="text-xs font-medium text-center block">{value}</span>;
}

export default async function MembershipPage() {
  const [planRows, session] = await Promise.all([
    prisma.membershipPlan.findMany({ orderBy: { price: "asc" } }),
    auth(),
  ]);
  const plans = planRows.map(toPricingCardData);

  const currentMembership = session?.user
    ? await prisma.gymMembership.findUnique({ where: { userId: session.user.id } })
    : null;

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* ─── Hero ─── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 hologram-lines opacity-10" />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Badge */}
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
            Membership Plans
          </span>

          <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
            Choose Your <span className="gradient-text">Plan</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            No hidden fees. No long-term contracts. Just a membership that works as hard as you do.
          </p>

          {/* Floating benefit chips */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {[
              { icon: Shield, label: "No Contracts" },
              { icon: Zap, label: "Free First Week" },
              { icon: Star, label: "Cancel Anytime" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm font-medium text-foreground animate-float"
              >
                <Icon size={14} className="text-primary" />
                {label}
              </span>
            ))}
          </div>

          {/* Social proof */}
          <p className="text-xs text-muted-foreground tracking-wide">
            <span className="text-primary font-semibold">Trusted by 2,000+ members</span>
            {" · "}
            Rated{" "}
            <span className="text-yellow-400 font-semibold">4.9★</span> on Google
          </p>
        </div>
      </section>

      {/* ─── Pricing Cards ─── */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => {
            const isPopular = plan.popular;
            const isElite = plan.slug === "elite";
            const perSession = Math.round(plan.price / 12);
            const isCurrentPlan = currentMembership?.planId === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl transition-all duration-500 ${
                  isPopular
                    ? "lg:scale-110 lg:-translate-y-4 z-10"
                    : "hover:-translate-y-2"
                }`}
              >
                {/* Popular glow border wrapper */}
                {isPopular && (
                  <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-b from-primary via-accent to-primary opacity-70 blur-[1px]" />
                )}

                <div
                  className={`relative rounded-3xl overflow-hidden ${
                    isPopular
                      ? "glass border-0"
                      : isElite
                      ? "glass border border-yellow-500/30"
                      : "glass border border-border/20"
                  }`}
                >
                  {/* Popular badge */}
                  {isPopular && (
                    <div className="flex justify-center pt-4 pb-0">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-bold tracking-wide shadow-lg shadow-primary/30">
                        <Sparkles size={12} />
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Elite top bar */}
                  {isElite && (
                    <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400" />
                  )}

                  <div className="p-7">
                    {/* Plan name + tagline */}
                    <div className="mb-6">
                      <h2
                        className={`text-xl font-black mb-1 ${
                          isElite ? "text-yellow-400" : isPopular ? "gradient-text" : "text-foreground"
                        }`}
                      >
                        {plan.name}
                      </h2>
                      <p className="text-xs text-muted-foreground">{plan.tagline}</p>
                    </div>

                    {/* Price display */}
                    <div className="mb-2">
                      {isPopular ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs text-muted-foreground">Rp</span>
                          <span className="text-5xl font-black gradient-text leading-none">
                            {(plan.price / 1000).toFixed(0)}k
                          </span>
                          <span className="text-xs text-muted-foreground">/mo</span>
                        </div>
                      ) : isElite ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs text-muted-foreground">Rp</span>
                          <span className="text-5xl font-black text-yellow-400 leading-none">
                            {(plan.price / 1000).toFixed(0)}k
                          </span>
                          <span className="text-xs text-muted-foreground">/mo</span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs text-muted-foreground">Rp</span>
                          <span className="text-5xl font-black text-foreground leading-none">
                            {(plan.price / 1000).toFixed(0)}k
                          </span>
                          <span className="text-xs text-muted-foreground">/mo</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-6">
                      ≈ Rp {perSession.toLocaleString("id-ID")} per session
                    </p>

                    {/* CTA */}
                    {isCurrentPlan ? (
                      <div className="w-full mb-8 flex items-center justify-center gap-2 py-2.5 rounded-md border border-primary/40 bg-primary/10 text-primary text-sm font-semibold">
                        <CheckCircle2 size={16} /> Paket Aktifmu
                      </div>
                    ) : session?.user ? (
                      <form action={subscribeToPlan.bind(null, plan.id)} className="mb-8">
                        <Button
                          type="submit"
                          variant={isPopular ? "hero" : isElite ? "neon" : "glass"}
                          size="lg"
                          className={`w-full ${
                            isElite
                              ? "border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-400"
                              : ""
                          }`}
                        >
                          {currentMembership ? "Ganti ke" : "Pilih"} {plan.name}
                          <ArrowRight size={16} />
                        </Button>
                      </form>
                    ) : (
                      <Button
                        variant={isPopular ? "hero" : isElite ? "neon" : "glass"}
                        size="lg"
                        className={`w-full mb-8 ${
                          isElite
                            ? "border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-400"
                            : ""
                        }`}
                        asChild
                      >
                        <Link href="/register">
                          Get {plan.name}
                          <ArrowRight size={16} />
                        </Link>
                      </Button>
                    )}

                    {/* Divider */}
                    <div
                      className={`h-px mb-6 ${
                        isPopular
                          ? "bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                          : isElite
                          ? "bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"
                          : "bg-border/20"
                      }`}
                    />

                    {/* Features */}
                    <ul className="space-y-3">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          {feat.included ? (
                            <span
                              className={`mt-0.5 shrink-0 rounded-full p-0.5 ${
                                isPopular
                                  ? "bg-primary/20 text-primary"
                                  : isElite
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <Check size={12} />
                            </span>
                          ) : (
                            <span className="mt-0.5 shrink-0 rounded-full p-0.5 bg-muted/30 text-muted-foreground/30">
                              <X size={12} />
                            </span>
                          )}
                          <span
                            className={feat.included ? "text-foreground" : "text-muted-foreground/40 line-through"}
                          >
                            {feat.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Comparison Table ─── */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">Compare</span>
          <h2 className="text-3xl lg:text-4xl font-black">
            Full <span className="gradient-text">Comparison</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm">Every feature, side by side.</p>
        </div>

        <div className="glass rounded-3xl border border-border/20 overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border-b border-border/20">
            <div className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Feature
            </div>
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`p-4 text-center ${plan.popular ? "bg-primary/10" : ""}`}
              >
                <div
                  className={`font-black text-sm ${
                    plan.slug === "elite"
                      ? "text-yellow-400"
                      : plan.popular
                      ? "gradient-text"
                      : "text-foreground"
                  }`}
                >
                  {plan.name}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Rp {plan.price.toLocaleString("id-ID")}/mo
                </div>
                {plan.popular && (
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-semibold">
                    Popular
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {COMPARISON_FEATURES.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-4 border-b border-border/10 last:border-0 transition-colors hover:bg-white/[0.02] ${
                i % 2 === 0 ? "bg-white/[0.01]" : ""
              }`}
            >
              <div className="p-4 text-sm text-muted-foreground font-medium sticky left-0">
                {row.label}
              </div>
              <div className="p-4 text-center text-sm">{renderCell(row.starter)}</div>
              <div className="p-4 text-center text-sm bg-primary/[0.03]">{renderCell(row.premium)}</div>
              <div className="p-4 text-center text-sm">{renderCell(row.elite)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ Accordion ─── */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 block">FAQ</span>
          <h2 className="text-3xl lg:text-4xl font-black">
            Common <span className="gradient-text">Questions</span>
          </h2>
        </div>
        <FAQAccordion />
      </section>

      {/* ─── Bottom CTA Banner ─── */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />
          <div className="absolute inset-0 hologram-lines opacity-10" />
          {/* Glow orbs */}
          <div className="absolute -top-16 left-1/4 w-72 h-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 right-1/4 w-72 h-72 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 py-20 px-6 text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block">
              Limited Time Offer
            </span>
            <h2 className="text-4xl lg:text-6xl font-black mb-4 leading-tight">
              Start Your <span className="gradient-text">Free Week</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Try any plan free for 7 days. No credit card required. Cancel whenever you want.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link href="/dashboard">
                  Claim Free Week <ArrowRight size={18} />
                </Link>
              </Button>
              <Button variant="neon" size="lg" asChild>
                <Link href="/classes">Explore Classes</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              No credit card · No commitment · Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
