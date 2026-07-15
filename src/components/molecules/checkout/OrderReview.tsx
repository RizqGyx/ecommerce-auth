import { Package, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/context/CartContext";
import type { AddressData } from "./AddressForm";

interface Props {
  items: CartItem[];
  address: AddressData;
  courierName: string;
  courierCost: number;
  onBack: () => void;
  onNext: () => void;
}

const CATEGORY_EMOJI: Record<string, string> = {
  Supplements: "💊", Food: "🥗", Merchandise: "👕",
};

const OrderReview = ({ items, address, courierName, courierCost, onBack, onNext }: Props) => (
  <div className="space-y-4">
    <div className="glass rounded-2xl border border-border/20 p-6">
      <h2 className="font-bold mb-4 flex items-center gap-2">
        <Package size={18} className="text-primary" /> Produk Dipesan
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg shrink-0">
              {CATEGORY_EMOJI[item.category] ?? "🏋️"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{item.name}</div>
              <div className="text-xs text-muted-foreground">×{item.quantity}</div>
            </div>
            <div className="text-sm font-bold text-primary shrink-0">
              Rp {(item.price * item.quantity).toLocaleString("id-ID")}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="glass rounded-2xl border border-border/20 p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold flex items-center gap-2"><MapPin size={18} className="text-primary" /> Alamat Pengiriman</h2>
        <button onClick={onBack} className="text-xs text-primary hover:text-primary/80">Ubah</button>
      </div>
      <div className="text-sm">
        <div className="font-semibold">{address.recipient} · {address.phone}</div>
        <div className="text-muted-foreground mt-1">{address.street}, {address.city}, {address.province} {address.postal}</div>
        {address.notes && (
          <div className="text-muted-foreground/60 text-xs mt-1 italic">&ldquo;{address.notes}&rdquo;</div>
        )}
      </div>
      <div className="mt-3 pt-3 border-t border-border/20 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Kurir: <strong className="text-foreground">{courierName}</strong></span>
        <span className="font-bold text-primary">Rp {courierCost.toLocaleString("id-ID")}</span>
      </div>
    </div>

    <Button variant="hero" className="w-full" onClick={onNext}>
      Pilih Pembayaran <ChevronRight size={16} />
    </Button>
  </div>
);

export default OrderReview;
