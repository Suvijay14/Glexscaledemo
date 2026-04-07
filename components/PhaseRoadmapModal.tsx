"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function PhaseRoadmapModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close modal"
            className="fixed inset-0 z-[160] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed left-1/2 top-1/2 z-[170] w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-dark-border bg-dark-surface p-6 shadow-2xl md:p-8"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <h2 className="font-syne text-2xl font-bold text-white">
                Phase Roadmap
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-dark-border p-2 text-text-secondary hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <PhaseColumn
                title="Phase 1 — Current (Prototype)"
                badge="IN PROGRESS"
                badgeClass="bg-green-500/15 text-green-400 border-green-500/40"
                items={[
                  "All 7 MVP features",
                  "Rules-based GCS engine",
                  "5–10 pilot customers",
                ]}
              />
              <PhaseColumn
                title="Phase 2 — Engagement Layer"
                badge="PLANNED"
                badgeClass="bg-amber-500/15 text-amber-400 border-amber-500/40"
                items={[
                  "ML-based scoring",
                  "Email automation",
                  "Deal registration",
                  "Multi-stakeholder workflows",
                ]}
              />
              <PhaseColumn
                title="Phase 3 — Scale"
                badge="ROADMAP"
                badgeClass="bg-gray-500/15 text-gray-400 border-gray-500/40"
                items={[
                  "Mobile application",
                  "Multi-language support",
                  "Advanced analytics",
                  "API for third-party integrations",
                ]}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PhaseColumn({
  title,
  badge,
  badgeClass,
  items,
}: {
  title: string;
  badge: string;
  badgeClass: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-dark-border bg-dark-bg/60 p-4">
      <h3 className="font-syne text-sm font-bold leading-snug text-white">
        {title}
      </h3>
      <span
        className={`mt-2 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wide ${badgeClass}`}
      >
        {badge}
      </span>
      <ul className="mt-4 space-y-2 text-sm text-text-secondary">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-green-accent">·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
