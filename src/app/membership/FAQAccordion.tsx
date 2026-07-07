"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. There are no lock-in contracts. Cancel online or at the gym, effective the end of your current billing month.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bank transfer, GoPay, OVO, DANA, ShopeePay, and all major credit/debit cards.",
  },
  {
    q: "Can I freeze my membership?",
    a: "Yes, Premium and Elite members can freeze their membership for up to 1 month per year at no charge.",
  },
  {
    q: "How does the QR code access work?",
    a: "After signing up, you'll receive a digital member card in your app with a unique QR code. Just scan it at the entrance gate to access the gym.",
  },
  {
    q: "Can I upgrade my plan?",
    a: "Absolutely. Upgrade anytime from your account dashboard. The price difference is prorated for the current month.",
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
