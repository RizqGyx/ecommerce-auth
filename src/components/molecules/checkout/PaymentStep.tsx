import { CreditCard } from "lucide-react";
import MidtransPayButton from "@/components/organisms/MidtransPayButton";

interface Props {
  subtotal: number;
  courierCost: number;
  total: number;
  courierName: string;
  createIntent: () => Promise<{ intentId: string; snapToken: string }>;
}

const PaymentStep = ({ subtotal, courierCost, total, courierName, createIntent }: Props) => {
  return (
    <div className="glass rounded-2xl border border-border/20 p-6">
      <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
        <CreditCard size={18} className="text-primary" /> Pembayaran
      </h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal produk</span><span>Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Ongkos kirim ({courierName})</span><span>Rp {courierCost.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between font-black text-xl pt-4 border-t border-border/20">
          <span>Total Bayar</span>
          <span className="gradient-text">Rp {total.toLocaleString("id-ID")}</span>
        </div>
      </div>

      <MidtransPayButton
        createIntent={createIntent}
        label={`Bayar Sekarang · Rp ${total.toLocaleString("id-ID")}`}
        className="mt-6"
      />
      <p className="text-center text-xs text-muted-foreground mt-3">
        🔒 Transaksi ini diproses secara aman melalui Midtrans
      </p>
    </div>
  );
};

export default PaymentStep;
