import Link from "next/link";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  plan: string;
  memberSince: string;
  validUntil: string;
  daysLeft: number;
  totalDays?: number;
}

const MembershipStatusWidget = ({ plan, memberSince, validUntil, daysLeft, totalDays = 31 }: Props) => (
  <div className="glass rounded-2xl border border-primary/20 p-5">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <CreditCard size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-bold">{plan} Membership</h3>
          <p className="text-xs text-muted-foreground">Member since {memberSince}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1 rounded-full text-xs font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        ACTIVE
      </div>
    </div>

    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Membership validity</span>
        <span className="font-semibold">{daysLeft} days remaining</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          style={{ width: `${Math.min(100, (daysLeft / totalDays) * 100)}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Today</span>
        <span>Expires {validUntil}</span>
      </div>
    </div>

    <div className="mt-4 flex gap-2">
      <Button variant="hero" size="sm" className="flex-1" asChild>
        <Link href="/membership">Renew Membership</Link>
      </Button>
      <Button variant="neon" size="sm" asChild>
        <Link href="/membership">Upgrade</Link>
      </Button>
    </div>
  </div>
);

export default MembershipStatusWidget;
