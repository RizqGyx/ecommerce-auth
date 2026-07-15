import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentMethodCard, { PAYMENT_METHODS, CATEGORY_LABELS, type PaymentMethod } from "@/components/molecules/PaymentMethodCard";

const CATEGORIES = ["qris", "ewallet", "bank", "card", "retail"] as const;

interface Props {
  paymentId: string;
  onSelect: (id: string) => void;
  subtotal: number;
  courierCost: number;
  fee: number;
  total: number;
  courierName: string;
  onPay: () => void;
}

const PaymentStep = ({ paymentId, onSelect, subtotal, courierCost, fee, total, courierName, onPay }: Props) => {
  const grouped = PAYMENT_METHODS.reduce<Record<string, PaymentMethod[]>>((acc, m) => {
    if (!acc[m.category]) acc[m.category] = [];
    acc[m.category].push(m);
    return acc;
  }, {});

  return (
    <div className="glass rounded-2xl border border-border/20 p-6">
      <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
        <CreditCard size={18} className="text-primary" /> Metode Pembayaran
      </h2>

      <div className="space-y-5">
        {CATEGORIES.map((cat) =>
          grouped[cat] ? (
            <div key={cat}>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                {CATEGORY_LABELS[cat]}
              </div>
              <div className="space-y-2">
                {grouped[cat].map((m) => (
                  <PaymentMethodCard key={m.id} method={m} selected={paymentId === m.id} onSelect={onSelect} />
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-border/20 space-y-2 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal produk</span><span>Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Ongkos kirim ({courierName})</span><span>Rp {courierCost.toLocaleString("id-ID")}</span>
        </div>
        {fee > 0 && (
          <div className="flex justify-between text-muted-foreground">
            <span>Biaya admin</span><span>Rp {fee.toLocaleString("id-ID")}</span>
          </div>
        )}
        <div className="flex justify-between font-black text-xl pt-4 border-t border-border/20">
          <span>Total Bayar</span>
          <span className="gradient-text">Rp {total.toLocaleString("id-ID")}</span>
        </div>
      </div>

      <Button variant="hero" size="lg" className="w-full mt-6 text-base h-14" onClick={onPay}>
        Bayar Sekarang · Rp {total.toLocaleString("id-ID")}
      </Button>
      <p className="text-center text-xs text-muted-foreground mt-3">
        🔒 Transaksi ini diproses secara aman melalui Midtrans
      </p>
    </div>
  );
};

export default PaymentStep;
