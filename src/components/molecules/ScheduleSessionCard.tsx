import Link from "next/link";
import { Clock, Users, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SessionData {
  id: string;
  time: string;
  endTime: string;
  class: string;
  coach: string;
  room: string;
  capacity: number;
  enrolled: number;
  price: number;
  level: string;
  color: string;
}

interface ScheduleSessionCardProps {
  session: SessionData;
  day: string;
  className?: string;
}

const ScheduleSessionCard = ({ session, day, className }: ScheduleSessionCardProps) => {
  const isFull = session.enrolled >= session.capacity;
  const fillPercent = Math.round((session.enrolled / session.capacity) * 100);

  return (
    <div
      className={cn(
        "glass rounded-2xl border border-border/20 hover:border-primary/30 transition-all duration-300 overflow-hidden group",
        className
      )}
    >
      <div className={`h-1 bg-gradient-to-r ${session.color}`} />

      <div className="p-5 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Time */}
          <div className="flex items-center gap-2 lg:min-w-36">
            <Clock size={16} className="text-primary" />
            <div>
              <div className="font-bold text-lg">{session.time}</div>
              <div className="text-xs text-muted-foreground">until {session.endTime}</div>
            </div>
          </div>

          {/* Class info */}
          <div className="flex-1">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
              {session.class}
            </h3>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
              <span>with {session.coach}</span>
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {session.room}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs border ${
                  session.level === "All Levels"
                    ? "text-primary border-primary/30 bg-primary/10"
                    : "text-accent border-accent/30 bg-accent/10"
                }`}
              >
                {session.level}
              </span>
            </div>
          </div>

          {/* Capacity */}
          <div className="lg:min-w-48">
            <div className="flex items-center justify-between mb-1.5 text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Users size={13} />
                {session.enrolled}/{session.capacity} spots
              </span>
              <span
                className={`text-xs font-bold ${
                  isFull ? "text-red-400" : fillPercent > 80 ? "text-yellow-400" : "text-green-400"
                }`}
              >
                {isFull ? "FULL" : fillPercent > 80 ? "ALMOST FULL" : "AVAILABLE"}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 bg-gradient-to-r ${
                  isFull
                    ? "from-red-500 to-red-600"
                    : fillPercent > 80
                    ? "from-yellow-500 to-orange-500"
                    : "from-primary to-accent"
                }`}
                style={{ width: `${fillPercent}%` }}
              />
            </div>
          </div>

          {/* Price + Book */}
          <div className="flex items-center gap-3 lg:min-w-48 lg:justify-end">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Per session</div>
              <div className="font-bold text-primary">Rp {session.price.toLocaleString("id-ID")}</div>
            </div>
            {isFull ? (
              <Button variant="ghost" size="sm" disabled className="shrink-0">Full</Button>
            ) : (
              <Button variant="hero" size="sm" className="shrink-0" asChild>
                <Link href={`/booking?day=${encodeURIComponent(day)}&sessionId=${session.id}`}>
                  Book <ChevronRight size={14} />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSessionCard;
