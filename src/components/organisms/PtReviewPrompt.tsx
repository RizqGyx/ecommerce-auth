"use client";

import { useState } from "react";
import { Check, MessageSquare } from "lucide-react";
import StarRatingInput from "@/components/molecules/StarRatingInput";
import { submitPtReview } from "@/app/reviews/actions";

interface Props {
  ptBookingId: string;
  coachName: string;
  alreadyReviewed: boolean;
}

const PtReviewPrompt = ({ ptBookingId, coachName, alreadyReviewed }: Props) => {
  const [done, setDone] = useState(alreadyReviewed);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (done) {
    return (
      <div className="glass rounded-2xl border border-green-400/20 p-5 text-left flex items-center gap-3">
        <Check size={18} className="text-green-400 shrink-0" />
        <p className="text-sm text-muted-foreground">Terima kasih atas ulasanmu untuk {coachName}!</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (rating === 0) return;
    setSubmitting(true);
    const result = await submitPtReview(ptBookingId, rating, comment);
    setSubmitting(false);
    if (result.success) setDone(true);
  };

  return (
    <div className="glass rounded-2xl border border-border/20 p-6 text-left">
      <div className="flex items-center gap-2.5 mb-4">
        <MessageSquare size={18} className="text-primary" />
        <h3 className="font-bold">Beri Ulasan untuk {coachName}</h3>
      </div>
      <StarRatingInput rating={rating} onChange={setRating} />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Ceritakan pengalamanmu (opsional)"
        rows={3}
        className="w-full mt-3 px-3 py-2 rounded-xl bg-card border border-border/30 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-all resize-none"
      />
      <button
        onClick={handleSubmit}
        disabled={!rating || submitting}
        className="mt-3 text-sm font-semibold text-primary hover:text-primary/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {submitting ? "Mengirim..." : "Kirim Ulasan"}
      </button>
    </div>
  );
};

export default PtReviewPrompt;
