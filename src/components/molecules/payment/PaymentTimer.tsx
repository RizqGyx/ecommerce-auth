"use client";

import { useState, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";

interface PaymentTimerProps {
  initialSeconds?: number;
  onExpire?: () => void;
}

const PaymentTimer = ({ initialSeconds = 900, onExpire }: PaymentTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }
    const t = setInterval(() => setTimeLeft((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(t);
  }, [timeLeft, onExpire]);

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const secs = (timeLeft % 60).toString().padStart(2, "0");
  const expired = timeLeft === 0;
  const urgent = timeLeft > 0 && timeLeft < 120;

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-mono font-bold ${
      expired
        ? "border-red-500/30 bg-red-500/10 text-red-400"
        : urgent
        ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-400 animate-pulse"
        : "border-primary/30 bg-primary/5 text-primary"
    }`}>
      {expired ? <AlertTriangle size={14} /> : <Clock size={14} />}
      {expired ? "Waktu Habis" : `${mins}:${secs}`}
    </div>
  );
};

export default PaymentTimer;
