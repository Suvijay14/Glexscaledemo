"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { dimensionBarColor } from "@/lib/gcs";
import { gcsTrackColor, useDashTheme } from "@/context/DashThemeContext";

export function DimensionBar({
  label,
  score,
  friction,
  tiny,
}: {
  label: string;
  score: number;
  friction?: boolean;
  tiny?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const color = dimensionBarColor(score, friction);
  const { t, isDashDark } = useDashTheme();
  const track = gcsTrackColor(isDashDark);

  if (tiny) {
    return (
      <div ref={ref} className="flex flex-1 flex-col gap-1">
        <div
          className="h-1.5 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: track }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${score}%` } : { width: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <span
          className="text-[9px] font-medium uppercase"
          style={{ color: t.dashTextMuted }}
        >
          {label}
        </span>
      </div>
    );
  }

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span style={{ color: t.dashTextSecondary }}>{label}</span>
        <span className="font-mono" style={{ color: t.dashTextPrimary }}>
          {score}
        </span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: track }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${score}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
