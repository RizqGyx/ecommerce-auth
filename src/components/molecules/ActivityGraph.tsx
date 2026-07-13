import { TrendingUp } from "lucide-react";

const ACTIVITY = [3, 5, 2, 6, 4, 7, 3, 5, 6, 4, 2, 5, 7, 3];

const ActivityGraph = () => (
  <div className="glass rounded-2xl border border-border/20 p-5">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-bold">Activity This Month</h3>
      <TrendingUp size={16} className="text-primary" />
    </div>
    <div className="flex items-end gap-1.5 h-20">
      {ACTIVITY.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center justify-end">
          <div
            className="w-full rounded-t-sm bg-gradient-to-t from-primary/60 to-accent/60"
            style={{ height: `${(v / 7) * 100}%` }}
          />
        </div>
      ))}
    </div>
    <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
      <span>Jun 1</span>
      <span>Jun 14</span>
      <span>Today</span>
    </div>
  </div>
);

export default ActivityGraph;
