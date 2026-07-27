"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
  /** e.g. "2.000+", "98%", "20+", "5+", "4.9★" — prefix/suffix around the number is preserved as-is */
  value: string;
  className?: string;
  duration?: number;
}

function parseValue(raw: string) {
  const match = raw.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: raw, decimals: 0 };
  const [, prefix, numStr, suffix] = match;
  const isDecimal = /^\d+\.\d{1,2}$/.test(numStr);
  const decimals = isDecimal ? numStr.split(".")[1].length : 0;
  const number = isDecimal ? parseFloat(numStr) : parseInt(numStr.replace(/[.,]/g, ""), 10);
  return { prefix, number: Number.isFinite(number) ? number : 0, suffix, decimals };
}

export default function AnimatedCounter({ value, className, duration = 1.4 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const { prefix, number, suffix, decimals } = parseValue(value);

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration, bounce: 0 });

  useEffect(() => {
    if (isInView) motionValue.set(number);
  }, [isInView, motionValue, number]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (!ref.current) return;
      const formatted = decimals > 0
        ? latest.toFixed(decimals)
        : Math.round(latest).toLocaleString("id-ID");
      ref.current.textContent = `${prefix}${formatted}${suffix}`;
    });
  }, [spring, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
