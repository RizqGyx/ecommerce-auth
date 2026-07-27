"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface ParallaxImageProps extends Omit<ImageProps, "className"> {
  /** Wrapper className (sizing, rounding, overflow) */
  wrapperClassName?: string;
  imageClassName?: string;
  /** How much the image drifts as it scrolls through the viewport, in px. */
  strength?: number;
}

export default function ParallaxImage({
  wrapperClassName,
  imageClassName,
  strength = 60,
  ...imageProps
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", wrapperClassName)}>
      <motion.div style={{ y }} className="absolute inset-0 -top-[10%] -bottom-[10%]">
        <Image {...imageProps} fill className={cn("object-cover", imageClassName)} />
      </motion.div>
    </div>
  );
}
