import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: "ewallet" | "bank" | "card" | "qris" | "retail";
  fee?: number;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "qris", name: "QRIS", description: "Scan & bayar dengan semua dompet digital", emoji: "⬛", category: "qris", fee: 0 },
  { id: "gopay", name: "GoPay", description: "Transfer otomatis ke nomor HP Gojek-mu", emoji: "🟢", category: "ewallet", fee: 0 },
  { id: "ovo", name: "OVO", description: "Bayar dari saldo OVO-mu", emoji: "🟣", category: "ewallet", fee: 0 },
  { id: "dana", name: "DANA", description: "Bayar dari akun DANA-mu", emoji: "🔵", category: "ewallet", fee: 0 },
  { id: "shopeepay", name: "ShopeePay", description: "Bayar dari dompet Shopee-mu", emoji: "🟠", category: "ewallet", fee: 0 },
  { id: "bca-va", name: "Virtual Account BCA", description: "Transfer ke nomor VA BCA yang digenerate", emoji: "🏦", category: "bank", fee: 0 },
  { id: "mandiri-va", name: "Virtual Account Mandiri", description: "Transfer ke nomor VA Mandiri yang digenerate", emoji: "🏦", category: "bank", fee: 0 },
  { id: "bni-va", name: "Virtual Account BNI", description: "Transfer ke nomor VA BNI yang digenerate", emoji: "🏦", category: "bank", fee: 0 },
  { id: "bri-va", name: "Virtual Account BRI", description: "Transfer ke nomor VA BRI yang digenerate", emoji: "🏦", category: "bank", fee: 0 },
  { id: "card", name: "Kartu Kredit / Debit", description: "Visa, Mastercard, American Express", emoji: "💳", category: "card", fee: 2000 },
  { id: "indomaret", name: "Indomaret", description: "Bayar tunai di kasir Indomaret terdekat", emoji: "🏪", category: "retail", fee: 2500 },
  { id: "alfamart", name: "Alfamart", description: "Bayar tunai di kasir Alfamart terdekat", emoji: "🏪", category: "retail", fee: 2500 },
];

const CATEGORY_LABELS: Record<string, string> = {
  qris: "QRIS",
  ewallet: "Dompet Digital",
  bank: "Transfer Bank",
  card: "Kartu",
  retail: "Gerai Retail",
};

interface PaymentMethodCardProps {
  method: PaymentMethod;
  selected: boolean;
  onSelect: (id: string) => void;
}

const PaymentMethodCard = ({ method, selected, onSelect }: PaymentMethodCardProps) => {
  return (
    <button
      onClick={() => onSelect(method.id)}
      className={cn(
        "w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200",
        selected
          ? "border-primary/60 bg-primary/5 shadow-sm shadow-primary/20"
          : "border-border/20 glass hover:border-primary/30 hover:bg-white/5"
      )}
    >
      <span className="text-2xl shrink-0">{method.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm">{method.name}</div>
        <div className="text-xs text-muted-foreground truncate">{method.description}</div>
        {method.fee ? (
          <div className="text-[10px] text-yellow-400 mt-0.5">Biaya admin: Rp {method.fee.toLocaleString("id-ID")}</div>
        ) : (
          <div className="text-[10px] text-green-400 mt-0.5">Tanpa biaya tambahan</div>
        )}
      </div>
      <div className={cn(
        "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
        selected ? "border-primary bg-primary" : "border-border"
      )}>
        {selected && <Check size={11} className="text-primary-foreground" />}
      </div>
    </button>
  );
};

export { CATEGORY_LABELS };
export default PaymentMethodCard;
