"use client";

import { useState } from "react";
import { Check, MessageSquare } from "lucide-react";
import StarRatingInput from "@/components/molecules/StarRatingInput";
import { submitProductReview } from "@/app/reviews/actions";

interface Item {
  productId: string;
  name: string;
}

interface Props {
  orderId: string;
  items: Item[];
  reviewedProductIds: string[];
}

const ProductReviewPrompt = ({ orderId, items, reviewedProductIds }: Props) => {
  const [done, setDone] = useState<Set<string>>(new Set(reviewedProductIds));
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);

  const pending = items.filter((i) => !done.has(i.productId));
  if (pending.length === 0) return null;

  const handleSubmit = async (productId: string) => {
    const rating = ratings[productId] ?? 0;
    if (rating === 0) return;
    setSubmitting(productId);
    const result = await submitProductReview(orderId, productId, rating, comments[productId]);
    setSubmitting(null);
    if (result.success) {
      setDone((prev) => new Set(prev).add(productId));
    }
  };

  return (
    <div className="glass rounded-2xl border border-border/20 p-6 text-left mt-6">
      <div className="flex items-center gap-2.5 mb-4">
        <MessageSquare size={18} className="text-primary" />
        <h3 className="font-bold">Beri Ulasan Produk</h3>
      </div>
      <div className="space-y-5">
        {pending.map((item) => (
          <div key={item.productId} className="border-t border-border/10 pt-4 first:border-0 first:pt-0">
            <p className="text-sm font-semibold mb-2">{item.name}</p>
            <StarRatingInput
              rating={ratings[item.productId] ?? 0}
              onChange={(r) => setRatings((prev) => ({ ...prev, [item.productId]: r }))}
            />
            <textarea
              value={comments[item.productId] ?? ""}
              onChange={(e) => setComments((prev) => ({ ...prev, [item.productId]: e.target.value }))}
              placeholder="Ceritakan pengalamanmu dengan produk ini (opsional)"
              rows={2}
              className="w-full mt-2 px-3 py-2 rounded-xl bg-card border border-border/30 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-all resize-none"
            />
            <button
              onClick={() => handleSubmit(item.productId)}
              disabled={!ratings[item.productId] || submitting === item.productId}
              className="mt-2 text-sm font-semibold text-primary hover:text-primary/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {submitting === item.productId ? "Mengirim..." : "Kirim Ulasan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviewPrompt;
