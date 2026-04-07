"use client";

import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import { DimensionBar } from "./DimensionBar";

export function HeroPreviewCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto mt-16 max-w-lg rounded-2xl border border-dark-border bg-dark-surface/90 p-6 shadow-[0_24px_80px_rgba(87,2,132,0.25)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-syne text-lg font-semibold text-white">
            Nexus Channel Group
          </p>
          <p className="text-sm text-text-secondary">
            Enterprise SaaS · France
          </p>
        </div>
        <div className="rounded-xl border border-green-500/40 bg-green-500/10 px-3 py-2 text-right">
          <span className="font-syne text-3xl font-bold text-[#22c55e]">84</span>
          <span className="text-sm text-text-secondary">/100</span>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#22c55e]">
            Strong Fit
          </p>
        </div>
      </div>
      <div className="mt-6 flex gap-2">
        <DimensionBar label="PEM" score={92} tiny />
        <DimensionBar label="MAI" score={88} tiny />
        <DimensionBar label="TCS" score={45} friction tiny />
        <DimensionBar label="SCSC" score={38} friction tiny />
        <DimensionBar label="RTA" score={72} tiny />
      </div>
      <p className="mt-4 text-xs text-text-muted">
        Live GCS preview — dimensions update as your commercial profile changes.
      </p>
    </motion.div>
  );
}
