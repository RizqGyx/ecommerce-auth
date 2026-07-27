"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Bisakah saya membatalkan kapan saja?",
    a: "Bisa. Tidak ada kontrak mengikat. Batalkan secara online atau langsung di gym, berlaku efektif di akhir bulan tagihan berjalan.",
  },
  {
    q: "Metode pembayaran apa saja yang diterima?",
    a: "Kami menerima transfer bank, GoPay, OVO, DANA, ShopeePay, dan semua kartu kredit/debit utama.",
  },
  {
    q: "Bisakah saya membekukan membership saya?",
    a: "Bisa, member Premium dan Elite dapat membekukan membership hingga 1 bulan per tahun tanpa biaya tambahan.",
  },
  {
    q: "Bagaimana cara kerja akses QR code?",
    a: "Setelah mendaftar, kamu akan mendapatkan kartu member digital di aplikasi dengan QR code unik. Tinggal scan di gerbang masuk untuk mengakses gym.",
  },
  {
    q: "Bisakah saya upgrade paket saya?",
    a: "Tentu saja. Upgrade kapan saja dari dashboard akunmu. Selisih harga dihitung prorata untuk bulan berjalan.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="glass rounded-2xl border border-border/20 overflow-hidden transition-all duration-300 hover:border-primary/20"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-6 text-left"
            >
              <span className="font-semibold text-sm sm:text-base">{faq.q}</span>
              <ChevronDown
                size={18}
                className={`text-primary shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6 pt-0">
                <div className="h-px bg-border/20 mb-4" />
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
