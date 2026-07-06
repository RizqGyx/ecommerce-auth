"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Award, Instagram, Star, Filter, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Coach } from "@/generated/prisma";

const MARQUEE_TAGS = [
  "Zumba Expert", "Muay Thai", "Yoga Alliance RYT-500", "PT Certified",
  "NASM", "Calisthenics", "Poundfit", "Strength Coach", "NSCA-CSCS",
  "Nutrition Certified", "Dance Fitness", "Kickboxing", "Meditation",
  "Sports Performance", "Body Recomposition", "ACSM-CPT", "Mindfulness",
  "Self-Defense", "Powerlifting", "Movement Training",
];

const INITIALS_GRADIENTS = [
  "from-blue-500/40 to-purple-600/40",
  "from-cyan-500/40 to-blue-600/40",
  "from-purple-500/40 to-pink-600/40",
  "from-teal-500/40 to-cyan-600/40",
  "from-indigo-500/40 to-purple-600/40",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function CoachesPageClient({ coaches }: { coaches: Coach[] }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const allSpecialties = Array.from(new Set(coaches.flatMap((c) => c.specialties)));
  const filterPills = [
    { label: "All", key: "all" },
    { label: "Personal Trainers", key: "pt" },
    { label: "Featured", key: "featured" },
    ...allSpecialties.slice(0, 5).map((s) => ({ label: s, key: s })),
  ];

  const featuredCoach = coaches.find((c) => c.featured) ?? coaches[0];
  const featuredIndex = coaches.findIndex((c) => c.id === featuredCoach?.id);

  const filteredCoaches = coaches.filter((c) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "pt") return c.isPersonalTrainer;
    if (activeFilter === "featured") return c.featured;
    return c.specialties.includes(activeFilter);
  });

  const restCoaches = filteredCoaches.filter((c) => c.id !== featuredCoach?.id);
  const showFeatured = filteredCoaches.some((c) => c.id === featuredCoach?.id);

  return (
    <div className="min-h-screen bg-background">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-28 pb-20">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0d0d1a] to-[#0a0a0a]" />
        <div className="hologram-lines absolute inset-0 opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-gradient-radial from-accent/8 via-transparent to-transparent rounded-full blur-2xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass border border-primary/20 text-primary text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
            <Users size={12} />
            Our Team
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mb-6">
            Meet Our
            <br />
            <span className="gradient-text">Coaches</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Every coach at S-One holds international certifications and brings
            real competitive experience. These are the best in Bukittinggi.
          </p>

          {/* Marquee strip */}
          <div className="relative overflow-hidden py-3 border-y border-border/20">
            <div
              className="animate-marquee flex gap-4 items-center"
              style={{ width: "max-content" }}
            >
              {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, i) => (
                <span
                  key={i}
                  className="shrink-0 glass text-xs font-semibold text-primary/80 border border-primary/20 px-4 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER PILLS ── */}
      <section className="sticky top-[72px] z-30 bg-background/80 backdrop-blur-md border-b border-border/20 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            <Filter size={14} className="text-muted-foreground shrink-0 mr-1" />
            {filterPills.map((pill) => (
              <button
                key={pill.key}
                onClick={() => setActiveFilter(pill.key)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                  activeFilter === pill.key
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                    : "glass border-border/30 text-muted-foreground hover:border-primary/30 hover:text-primary"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED SPOTLIGHT ── */}
      {showFeatured && featuredCoach && (
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="relative glass rounded-3xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="relative z-10 p-8 lg:p-12">
              {/* Featured badge row */}
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-black px-4 py-1.5 rounded-full">
                  <Star size={10} fill="currentColor" />
                  FEATURED COACH
                </span>
                {featuredCoach.isPersonalTrainer && (
                  <span className="glass border border-primary/30 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                    Personal Trainer
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                {/* Left: Avatar + stats */}
                <div className="lg:col-span-2 flex flex-col items-center lg:items-start gap-6">
                  {/* Big initials avatar */}
                  <div
                    className={`relative w-40 h-40 rounded-3xl bg-gradient-to-br ${
                      INITIALS_GRADIENTS[Math.max(featuredIndex, 0) % INITIALS_GRADIENTS.length]
                    } border border-primary/30 flex items-center justify-center overflow-hidden`}
                  >
                    <span className="text-6xl font-black gradient-text select-none">
                      {getInitials(featuredCoach.name)}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  </div>

                  {/* Quick stats */}
                  <div className="flex gap-4">
                    <div className="glass border border-border/20 rounded-xl px-4 py-3 text-center">
                      <div className="text-2xl font-black gradient-text">
                        {featuredCoach.experience}y
                      </div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                        Experience
                      </div>
                    </div>
                    <div className="glass border border-border/20 rounded-xl px-4 py-3 text-center">
                      <div className="text-2xl font-black gradient-text">
                        {featuredCoach.specialties.length}
                      </div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                        Specialties
                      </div>
                    </div>
                    {featuredCoach.pricePerSession && (
                      <div className="glass border border-border/20 rounded-xl px-4 py-3 text-center">
                        <div className="text-sm font-black gradient-text leading-tight">
                          Rp {(featuredCoach.pricePerSession / 1000).toFixed(0)}k
                        </div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                          /session
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Content */}
                <div className="lg:col-span-3">
                  <h2 className="text-4xl lg:text-5xl font-black mb-2 leading-tight">
                    {featuredCoach.name}
                  </h2>
                  <p className="text-primary font-semibold mb-4">{featuredCoach.title}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm lg:text-base">
                    {featuredCoach.bio}
                  </p>

                  {/* Specialties grid */}
                  <div className="mb-6">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                      Specialties
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {featuredCoach.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mb-8">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                      Certifications
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {featuredCoach.certifications.map((cert) => (
                        <div key={cert} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Award size={12} className="text-yellow-400 shrink-0" />
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3">
                    {featuredCoach.isPersonalTrainer && (
                      <Button variant="hero" asChild>
                        <Link href={`/personal-trainer/book?trainer=${featuredCoach.id}`}>
                          Book PT Session <ArrowRight size={16} />
                        </Link>
                      </Button>
                    )}
                    <Button variant="neon" asChild>
                      <Link href={`/coaches/${featuredCoach.id}`}>
                        Full Profile <ChevronRight size={16} />
                      </Link>
                    </Button>
                    {featuredCoach.instagram && (
                      <a
                        href={`https://instagram.com/${featuredCoach.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 glass border border-border/30 text-muted-foreground hover:text-pink-400 hover:border-pink-400/30 transition-colors px-4 py-2 rounded-lg text-sm"
                      >
                        <Instagram size={14} />
                        {featuredCoach.instagram}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── REST OF COACHES GRID ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {restCoaches.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-xl font-bold">
                {activeFilter === "all" ? "All Coaches" : "Matching Coaches"}
              </h2>
              <span className="glass border border-border/20 text-xs text-muted-foreground px-3 py-1 rounded-full">
                {restCoaches.length} coach{restCoaches.length !== 1 ? "es" : ""}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
              {restCoaches.map((coach, i) => (
                <div
                  key={coach.id}
                  className="group glass rounded-2xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10"
                >
                  {/* Mini avatar header */}
                  <div
                    className={`relative h-28 bg-gradient-to-br ${
                      INITIALS_GRADIENTS[i % INITIALS_GRADIENTS.length]
                    } flex items-center justify-center overflow-hidden`}
                  >
                    <span className="text-5xl font-black opacity-50 select-none text-white">
                      {getInitials(coach.name)}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
                    <div className="absolute top-2.5 right-2.5 flex flex-col gap-1">
                      {coach.isPersonalTrainer && (
                        <span className="bg-primary/90 text-primary-foreground text-[9px] font-black px-2 py-0.5 rounded-full">
                          PT
                        </span>
                      )}
                      {coach.featured && (
                        <span className="bg-accent/90 text-accent-foreground text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <Star size={7} fill="currentColor" />
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-sm leading-tight mb-0.5 group-hover:text-primary transition-colors">
                      {coach.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground mb-3 leading-tight">
                      {coach.title}
                    </p>

                    {/* 2 specialty tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {coach.specialties.slice(0, 2).map((spec) => (
                        <span
                          key={spec}
                          className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Experience */}
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground mb-4 pb-3 border-b border-border/20">
                      <Award size={10} className="text-yellow-400 shrink-0" />
                      {coach.experience} yrs experience
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      {coach.isPersonalTrainer && (
                        <Button variant="hero" size="sm" className="w-full text-xs h-8" asChild>
                          <Link href={`/personal-trainer/book?trainer=${coach.id}`}>
                            Book PT <ArrowRight size={12} />
                          </Link>
                        </Button>
                      )}
                      <Button variant="glass" size="sm" className="w-full text-xs h-8" asChild>
                        <Link href={`/coaches/${coach.id}`}>
                          View Profile
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {filteredCoaches.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No coaches match this filter.</p>
            <button
              onClick={() => setActiveFilter("all")}
              className="mt-4 text-primary text-sm hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}
      </section>

      {/* ── BOTTOM CTA BANNER ── */}
      <section className="relative overflow-hidden py-20 mt-8">
        {/* Diagonal gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-[#0d0820] to-accent/15" />
        <div className="absolute inset-0 hologram-lines opacity-10" />
        {/* Diagonal stripe overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 20px, white 20px, white 22px)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 glass border border-primary/20 text-primary text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            <Star size={11} fill="currentColor" />
            Personalized Training
          </div>
          <h2 className="text-4xl lg:text-6xl font-black mb-4 leading-tight">
            Book Your{" "}
            <span className="gradient-text">Personal Trainer</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Stop guessing your way through workouts. Get a certified trainer who
            builds everything around you.
          </p>
          <Button variant="hero" size="lg" className="text-base px-10 py-6 h-auto" asChild>
            <Link href="/personal-trainer">
              Explore Personal Training <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
