import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COURIERS, PROVINCES } from "@/lib/data";

export interface AddressData {
  recipient: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postal: string;
  notes: string;
}

const FIELDS: { label: string; field: keyof AddressData; colSpan: string }[] = [
  { label: "Nama Penerima",                                    field: "recipient", colSpan: "sm:col-span-1" },
  { label: "Nomor HP / WhatsApp",                              field: "phone",     colSpan: "sm:col-span-1" },
  { label: "Alamat Lengkap (Jalan, No, RT/RW, Kelurahan)",    field: "street",    colSpan: "sm:col-span-2" },
  { label: "Kota / Kabupaten",                                 field: "city",      colSpan: "sm:col-span-1" },
  { label: "Kode Pos",                                         field: "postal",    colSpan: "sm:col-span-1" },
];

interface Props {
  address: AddressData;
  courierId: string;
  onAddress: (a: AddressData) => void;
  onCourier: (id: string) => void;
  onNext: () => void;
}

const AddressForm = ({ address, courierId, onAddress, onCourier, onNext }: Props) => {
  const set = (field: keyof AddressData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    onAddress({ ...address, [field]: e.target.value });

  const inputClass = "w-full px-3 py-2.5 rounded-xl bg-card border border-border/30 text-sm focus:outline-none focus:border-primary/50 transition-colors";

  return (
    <div className="glass rounded-2xl border border-border/20 p-6">
      <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
        <span className="text-primary">📦</span> Alamat Pengiriman
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.map(({ label, field, colSpan }) => (
          <div key={field} className={colSpan}>
            <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
            <input value={address[field]} onChange={set(field)} className={inputClass} />
          </div>
        ))}

        <div className="sm:col-span-1">
          <label className="text-xs text-muted-foreground mb-1.5 block">Provinsi</label>
          <select value={address.province} onChange={set("province")} className={inputClass}>
            {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs text-muted-foreground mb-1.5 block">Catatan untuk Penjual (opsional)</label>
          <textarea
            value={address.notes}
            onChange={set("notes")}
            rows={2}
            placeholder="Mis: Titip di depan pintu, hubungi via WA sebelum kirim..."
            className="w-full px-3 py-2.5 rounded-xl bg-card border border-border/30 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
          />
        </div>
      </div>

      {/* Courier */}
      <div className="mt-6">
        <h3 className="font-semibold text-sm mb-3">Pilih Kurir</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COURIERS.map((c) => (
            <button key={c.id} onClick={() => onCourier(c.id)}
              className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                courierId === c.id ? "border-primary/60 bg-primary/5" : "border-border/20 glass hover:border-primary/30"
              }`}>
              <div>
                <div className="font-semibold text-sm">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.estimasi}</div>
              </div>
              <div className="text-sm font-bold text-primary">Rp {c.cost.toLocaleString("id-ID")}</div>
            </button>
          ))}
        </div>
      </div>

      <Button variant="hero" className="w-full mt-6" onClick={onNext}
        disabled={!address.recipient || !address.phone || !address.street || !address.city}>
        Lanjut ke Review <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default AddressForm;
