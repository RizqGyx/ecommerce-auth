"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { QrCode, Settings, Dumbbell, Clock, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import QRCodeVisual from "@/components/atoms/QRCodeVisual";
import BarcodeVisual from "@/components/atoms/BarcodeVisual";
import MembershipCardDisplay from "@/components/molecules/MembershipCardDisplay";
import DashboardStatCard from "@/components/molecules/DashboardStatCard";
import ActivityGraph from "@/components/molecules/ActivityGraph";
import MembershipStatusWidget from "@/components/organisms/MembershipStatusWidget";
import UpcomingClassesWidget from "@/components/organisms/UpcomingClassesWidget";
import PTRegistrationWidget from "@/components/organisms/PTRegistrationWidget";
import RecentTransactionsWidget from "@/components/organisms/RecentTransactionsWidget";

const MOCK_USER = {
  name: "Ahmad Berzki",
  email: "berzki@s-onegym.id",
  memberId: "S1G-2025-0042",
  plan: "Premium",
  planColor: "from-primary to-accent",
  memberSince: "January 2025",
  validUntil: "July 31, 2025",
  visitsThisMonth: 14,
  classesAttended: 9,
  barcodeValue: "S1G20250042BRZ",
};

const UPCOMING_CLASSES = [
  { class: "Zumba",        coach: "Rina Sari",    date: "Mon, Jun 30", time: "08:00", room: "Studio B",    color: "from-pink-500 to-rose-600",  icon: "🕺" },
  { class: "Yoga",         coach: "Sari Dewi",    date: "Wed, Jul 2",  time: "06:00", room: "Studio A",    color: "from-green-500 to-emerald-600", icon: "🧘" },
  { class: "Calisthenics", coach: "Ahmad Rizky",  date: "Thu, Jul 3",  time: "09:00", room: "Outdoor Area", color: "from-cyan-500 to-blue-600",  icon: "💪" },
];

const STATS = [
  { label: "Visits This Month",  value: MOCK_USER.visitsThisMonth,  icon: Dumbbell, color: "text-primary" },
  { label: "Classes Attended",   value: MOCK_USER.classesAttended,  icon: Users,    color: "text-accent" },
  { label: "Days Left",          value: 31,                         icon: Clock,    color: "text-green-400" },
  { label: "Streak",             value: "7 days",                   icon: Zap,      color: "text-yellow-400" },
];

export default function DashboardPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) router.push("/login");
  }, [isLoading, isLoggedIn, router]);

  const daysLeft = Math.ceil(
    (new Date("2025-07-31").getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Top bar */}
      <div className="border-b border-border/20 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">
              Welcome back, <span className="gradient-text">{(user?.name || MOCK_USER.name).split(" ")[0]}</span> 👋
            </h1>
            <p className="text-xs text-muted-foreground">{user?.email || MOCK_USER.email}</p>
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
            <MembershipCardDisplay user={MOCK_USER} />

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
                <QRCodeVisual value={MOCK_USER.barcodeValue} />
              </div>
              <div className="text-center">
                <div className="font-mono text-xs text-muted-foreground tracking-widest">{MOCK_USER.barcodeValue}</div>
                <div className="text-[10px] text-muted-foreground/60 mt-1">Refreshes every 60 seconds for security</div>
              </div>
            </div>

            {/* Barcode */}
            <div className="glass rounded-2xl border border-border/20 p-5">
              <h3 className="font-bold text-sm mb-1">Barcode</h3>
              <p className="text-xs text-muted-foreground mb-3">Alternative entry method</p>
              <BarcodeVisual value={MOCK_USER.barcodeValue} label={MOCK_USER.memberId} />
            </div>
          </div>

          {/* RIGHT column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((s) => <DashboardStatCard key={s.label} {...s} />)}
            </div>

            <MembershipStatusWidget
              plan={MOCK_USER.plan}
              memberSince={MOCK_USER.memberSince}
              validUntil={MOCK_USER.validUntil}
              daysLeft={daysLeft}
            />

            <ActivityGraph />

            <RecentTransactionsWidget />

            <UpcomingClassesWidget classes={UPCOMING_CLASSES} />

            <PTRegistrationWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
