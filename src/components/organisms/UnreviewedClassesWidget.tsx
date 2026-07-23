"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import type { ClassRegistration, ClassSession, ClassType, Coach } from "@/generated/prisma";
import StarRatingInput from "@/components/molecules/StarRatingInput";
import { submitClassReview } from "@/app/reviews/actions";

type RegistrationRow = ClassRegistration & {
  session: ClassSession & { classType: ClassType; coach: Coach };
};

interface Props {
  registrations: RegistrationRow[];
}

const UnreviewedClassesWidget = ({ registrations }: Props) => {
  const [done, setDone] = useState<Set<string>>(new Set());
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);

  const pending = registrations.filter((r) => !done.has(r.sessionId));
  if (pending.length === 0) return null;

  const handleSubmit = async (sessionId: string) => {
    const rating = ratings[sessionId] ?? 0;
    if (rating === 0) return;
    setSubmitting(sessionId);
    const result = await submitClassReview(sessionId, rating, comments[sessionId]);
    setSubmitting(null);
    if (result.success) setDone((prev) => new Set(prev).add(sessionId));
  };

  return (
    <div className="glass rounded-2xl border border-primary/20 p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <MessageSquare size={18} className="text-primary" />
        <h3 className="font-bold text-sm">Beri Ulasan Kelas</h3>
      </div>
      <div className="space-y-4">
        {pending.map((reg) => (
          <div key={reg.id} className="border-t border-border/10 pt-4 first:border-0 first:pt-0">
            <p className="text-sm font-semibold">{reg.session.classType.name}</p>
            <p className="text-xs text-muted-foreground mb-2">
              {reg.session.coach.name} · {reg.session.date.toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
            </p>
            <StarRatingInput
              rating={ratings[reg.sessionId] ?? 0}
              onChange={(r) => setRatings((prev) => ({ ...prev, [reg.sessionId]: r }))}
              size={18}
            />
            <textarea
              value={comments[reg.sessionId] ?? ""}
              onChange={(e) => setComments((prev) => ({ ...prev, [reg.sessionId]: e.target.value }))}
              placeholder="Bagaimana kelasnya? (opsional)"
              rows={2}
              className="w-full mt-2 px-3 py-2 rounded-xl bg-card border border-border/30 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-all resize-none"
            />
            <button
              onClick={() => handleSubmit(reg.sessionId)}
              disabled={!ratings[reg.sessionId] || submitting === reg.sessionId}
              className="mt-2 text-sm font-semibold text-primary hover:text-primary/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {submitting === reg.sessionId ? "Mengirim..." : "Kirim Ulasan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnreviewedClassesWidget;
