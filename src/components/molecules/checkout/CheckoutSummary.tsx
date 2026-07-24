import type { CartItem } from "@/context/CartContext";

interface Props {
  items: CartItem[];
  courierCost: number;
  total: number;
}

const CheckoutSummary = ({ items, courierCost, total }: Props) => (
  <div className="glass rounded-2xl border border-border/20 p-5 sticky top-24">
    <h3 className="font-bold mb-4">Ringkasan</h3>
    <div className="space-y-2 text-sm mb-4">
      {items.map((item) => (
        <div key={item.id} className="flex justify-between gap-2 text-muted-foreground">
          <span className="truncate">{item.name} ×{item.quantity}</span>
          <span className="shrink-0">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
        </div>
      ))}
    </div>
    <div className="border-t border-border/20 pt-3 space-y-1.5 text-sm">
      <div className="flex justify-between text-muted-foreground">
        <span>Ongkir</span><span>Rp {courierCost.toLocaleString("id-ID")}</span>
      </div>
      <div className="flex justify-between font-black text-base pt-2 border-t border-border/20">
        <span>Total</span>
        <span className="gradient-text">Rp {total.toLocaleString("id-ID")}</span>
      </div>
    </div>
  </div>
);

export default CheckoutSummary;
