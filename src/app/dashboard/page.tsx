import { redirect } from "next/navigation";
import Link from "next/link";
import { QrCode, Settings, Dumbbell, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toOrderSummary, toClassRegistrationSummary, toPtBookingSummary } from "@/lib/serializers";
import { getUnreviewedClassPrompts } from "@/lib/reviewPrompts";
import QRCodeVisual from "@/components/atoms/QRCodeVisual";
import BarcodeVisual from "@/components/atoms/BarcodeVisual";
import MembershipCardDisplay from "@/components/molecules/MembershipCardDisplay";
import DashboardStatCard from "@/components/molecules/DashboardStatCard";
import ActivityGraph from "@/components/molecules/ActivityGraph";
import MembershipStatusWidget from "@/components/organisms/MembershipStatusWidget";
import UpcomingClassesWidget from "@/components/organisms/UpcomingClassesWidget";
import PTRegistrationWidget from "@/components/organisms/PTRegistrationWidget";
import RecentTransactionsWidget from "@/components/organisms/RecentTransactionsWidget";
import UnreviewedClassesWidget from "@/components/organisms/UnreviewedClassesWidget";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/dashboard");

  const userId = session.user.id;
  const now = new Date();

  const [
    membership,
    memberCard,
    upcomingRegistrations,
    attendedCount,
    orders,
    recentRegistrations,
    ptBookings,
    activePtBooking,
    unreviewedClasses,
  ] = await Promise.all([
    prisma.gymMembership.findUnique({ where: { userId }, include: { plan: true } }),
    prisma.memberCard.findUnique({ where: { userId } }),
    prisma.classRegistration.findMany({
      where: { userId, status: "REGISTERED", session: { date: { gte: now } } },
      include: { session: { include: { classType: true, coach: true } } },
      orderBy: { session: { date: "asc" } },
      take: 5,
    }),
    prisma.classRegistration.count({ where: { userId, status: "ATTENDED" } }),
    prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.classRegistration.findMany({
      where: { userId },
      include: { session: { include: { classType: true, coach: true } } },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.pTBooking.findMany({
      where: { userId },
      include: { coach: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.pTBooking.findFirst({
      where: { userId, status: "ACTIVE" },
      include: { coach: true },
      orderBy: { createdAt: "desc" },
    }),
    getUnreviewedClassPrompts(userId),
  ]);

  const recentTransactions = [
    ...orders.map(toOrderSummary),
    ...recentRegistrations.map(toClassRegistrationSummary),
    ...ptBookings.map(toPtBookingSummary),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3);

  const upcomingClasses = upcomingRegistrations.map((r) => ({
    class: r.session.classType.name,
    coach: r.session.coach.name,
    date: r.session.date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    time: r.session.startTime,
    room: r.session.room ?? "",
    color: r.session.classType.color ?? "from-primary to-accent",
    icon: r.session.classType.icon ?? "🏋️",
  }));

  const daysLeft = membership
    ? Math.max(0, Math.ceil((membership.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

  const STATS = [
    { label: "Classes Attended", value: attendedCount, icon: Users, color: "text-accent" },
    { label: "Days Left", value: membership ? daysLeft : "-", icon: Clock, color: "text-green-400" },
    { label: "Upcoming Classes", value: upcomingRegistrations.length, icon: Dumbbell, color: "text-primary" },
  ];

  const memberId = memberCard ? `S1G-${memberCard.barcodeCode.slice(-8).toUpperCase()}` : "";

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Top bar */}
      <div className="border-b border-border/20 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">
              Welcome back, <span className="gradient-text">{(session.user.name ?? "Member").split(" ")[0]}</span> 👋
            </h1>
            <p className="text-xs text-muted-foreground">{session.user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/settings" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors">
              <Settings size={18} />
            </Link>
            <Button variant="neon" size="sm" asChild>
              <Link href="/schedule">Book Class</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT column */}
          <div className="lg:col-span-1 space-y-6">
            {membership && memberCard ? (
              <>
                <MembershipCardDisplay
                  user={{
                    name: session.user.name ?? "Member",
                    memberId,
                    plan: membership.plan.name,
                    planColor: membership.plan.color ?? "from-primary to-accent",
                    validUntil: membership.endDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
                  }}
                />

                {/* QR Entry */}
                <div className="glass rounded-2xl border border-border/20 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold">Gym Entry QR</h3>
                      <p className="text-xs text-muted-foreground">Scan at entrance gate</p>
                    </div>
                    <QrCode size={20} className="text-primary" />
                  </div>
                  <div className="flex justify-center mb-3">
                    <QRCodeVisual value={memberCard.barcodeCode} />
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-xs text-muted-foreground tracking-widest">{memberId}</div>
                  </div>
                </div>

                {/* Barcode */}
                <div className="glass rounded-2xl border border-border/20 p-5">
                  <h3 className="font-bold text-sm mb-1">Barcode</h3>
                  <p className="text-xs text-muted-foreground mb-3">Alternative entry method</p>
                  <BarcodeVisual value={memberCard.barcodeCode} label={memberId} />
                </div>
              </>
            ) : (
              <div className="glass rounded-2xl border border-border/20 p-6 text-center">
                <h3 className="font-bold mb-2">Belum Punya Membership</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Pilih paket membership untuk mendapatkan kartu member dan akses gym.
                </p>
                <Button variant="hero" size="sm" className="w-full" asChild>
                  <Link href="/membership">Pilih Paket Membership</Link>
                </Button>
              </div>
            )}
          </div>

          {/* RIGHT column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {STATS.map((s) => <DashboardStatCard key={s.label} {...s} />)}
            </div>

            {membership && (
              <MembershipStatusWidget
                plan={membership.plan.name}
                memberSince={membership.startDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                validUntil={membership.endDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                daysLeft={daysLeft}
              />
            )}

            <ActivityGraph />

            <RecentTransactionsWidget transactions={recentTransactions} />

            <UpcomingClassesWidget classes={upcomingClasses} />

            <UnreviewedClassesWidget registrations={unreviewedClasses} />

            <PTRegistrationWidget ptBooking={activePtBooking} />
          </div>
        </div>
      </div>
    </div>
  );
}
