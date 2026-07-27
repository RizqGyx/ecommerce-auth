"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Explicit delay in ms. Overrides index-based stagger if set. */
  delay?: number;
  /** Position within a staggered group — delay = index * staggerMs. */
  index?: number;
  staggerMs?: number;
}

export default function Reveal({ children, className, delay, index, staggerMs = 90 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const computedDelay = delay ?? (index !== undefined ? index * staggerMs : 0);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ "--reveal-delay": `${computedDelay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
