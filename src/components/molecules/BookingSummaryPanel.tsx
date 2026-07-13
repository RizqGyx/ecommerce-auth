import { ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Session {
  class: string;
  time: string;
  coach: string;
  price: number;
}

interface Props {
  session: Session;
  day: string;
  fee: number;
  total: number;
  agreed: boolean;
  onAgree: () => void;
  onBook: () => void;
}

const BookingSummaryPanel = ({ session, day, fee, total, agreed, onAgree, onBook }: Props) => (
  <div className="glass rounded-2xl border border-border/20 p-5 sticky top-24">
    <h3 className="font-bold mb-4">Ringkasan Booking</h3>

    <div className="space-y-2 text-sm mb-4">
      <div className="flex justify-between"><span className="text-muted-foreground">Kelas</span><span className="font-semibold">{session.class}</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Jadwal</span><span className="font-semibold">{day}, {session.time}</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Pelatih</span><span className="font-semibold">{session.coach}</span></div>
    </div>

    <div className="border-t border-border/20 pt-4 space-y-2 text-sm">
      <div className="flex justify-between text-muted-foreground">
        <span>Harga kelas</span><span>Rp {session.price.toLocaleString("id-ID")}</span>
      </div>
      {fee > 0 && (
        <div className="flex justify-between text-muted-foreground">
          <span>Biaya admin</span><span>Rp {fee.toLocaleString("id-ID")}</span>
        </div>
      )}
      <div className="flex justify-between font-black text-lg pt-3 border-t border-border/20">
        <span>Total</span>
        <span className="gradient-text">Rp {total.toLocaleString("id-ID")}</span>
      </div>
    </div>

    {/* Agreement */}
    <label className="flex items-start gap-3 cursor-pointer mt-4 p-3 rounded-xl border border-border/20 hover:border-primary/20 transition-colors">
      <div
        className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 shrink-0 transition-all ${agreed ? "bg-primary border-primary" : "border-border"}`}
        onClick={onAgree}
      >
        {agreed && <Check size={12} className="text-primary-foreground" />}
      </div>
      <span className="text-xs text-muted-foreground leading-relaxed">
        Saya setuju dengan <span className="text-primary">ketentuan booking kelas</span>. Pembatalan dapat dilakukan maksimal 2 jam sebelum sesi dimulai untuk refund penuh.
      </span>
    </label>

    <Button variant="hero" size="lg" className="w-full mt-4 h-12" onClick={onBook} disabled={!agreed}>
      Konfirmasi Booking <ChevronRight size={16} />
    </Button>
    <p className="text-center text-xs text-muted-foreground mt-3">🔒 Aman · Diproses oleh Midtrans</p>
  </div>
);

export default BookingSummaryPanel;
