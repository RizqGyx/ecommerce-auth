import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

const DashboardStatCard = ({ label, value, icon: Icon, color }: Props) => (
  <div className="glass rounded-2xl p-4 border border-border/20 text-center">
    <Icon size={20} className={`${color} mx-auto mb-2`} />
    <div className={`text-2xl font-black ${color}`}>{value}</div>
    <div className="text-[10px] text-muted-foreground mt-0.5">{label}</div>
  </div>
);

export default DashboardStatCard;
