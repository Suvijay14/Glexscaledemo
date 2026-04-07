"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function StatsCard({
  label,
  value,
  sub,
  className,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn(
        "rounded-2xl border border-dark-border bg-dark-surface p-5",
        className
      )}
    >
      <p className="text-sm text-text-secondary">{label}</p>
      <p className="mt-2 font-syne text-3xl font-bold text-white">{value}</p>
      {sub && <p className="mt-1 text-xs text-text-muted">{sub}</p>}
    </motion.div>
  );
}
