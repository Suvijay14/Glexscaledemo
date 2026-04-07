"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FloatingOrb({
  className,
  size = 280,
  delay = 0,
  duration = 8,
}: {
  className?: string;
  size?: number;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={cn("pointer-events-none absolute rounded-full blur-3xl", className)}
      style={{ width: size, height: size }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}
