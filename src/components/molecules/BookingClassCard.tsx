import { Calendar, Clock, Users, MapPin } from "lucide-react";

interface Session {
  class: string;
  time: string;
  endTime: string;
  coach: string;
  room: string;
  capacity: number;
  enrolled: number;
  color: string;
}

interface Props {
  session: Session;
  day: string;
}

const BookingClassCard = ({ session, day }: Props) => (
  <div className="glass rounded-2xl border border-border/20 overflow-hidden">
    <div className={`h-1.5 bg-gradient-to-r ${session.color}`} />
    <div className="p-6">
      <h2 className="text-2xl font-black mb-4">{session.class}</h2>
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Calendar, label: "Hari",    value: day },
          { icon: Clock,    label: "Waktu",   value: `${session.time} – ${session.endTime}` },
          { icon: Users,    label: "Pelatih", value: session.coach },
          { icon: MapPin,   label: "Ruangan", value: session.room },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-2.5">
            <Icon size={15} className="text-primary mt-0.5 shrink-0" />
            <div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{label}</div>
              <div className="text-sm font-semibold">{value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border/20 flex items-center justify-end">
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Kapasitas</div>
          <div className="text-sm font-semibold text-yellow-400">
            {session.capacity - session.enrolled} slot tersisa dari {session.capacity}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BookingClassCard;
