"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const features = [
  {
    id: "F1",
    name: "Landing Page & Value Proposition",
    priority: "P0" as const,
    complexity: "Low" as const,
    desc: "Public marketing surface, brand narrative, and primary conversion paths.",
  },
  {
    id: "F2",
    name: "User Registration & Authentication",
    priority: "P0" as const,
    complexity: "Medium" as const,
    desc: "Secure sign-up, login, session handling, and role-aware access.",
  },
  {
    id: "F3",
    name: "User Profile Management",
    priority: "P0" as const,
    complexity: "High" as const,
    desc: "Commercial and channel profiles with completeness scoring.",
  },
  {
    id: "F4",
    name: "Partner Directory & Search",
    priority: "P0" as const,
    complexity: "Medium" as const,
    desc: "Indexed partners with faceted filters and sort.",
  },
  {
    id: "F5",
    name: "GCS Scoring Engine",
    priority: "P0" as const,
    complexity: "High" as const,
    desc: "Five-dimension compatibility model with explainability.",
  },
  {
    id: "F6",
    name: "Contact & Calendar Integration",
    priority: "P1" as const,
    complexity: "Medium" as const,
    desc: "Introductions, meeting booking, and notification hooks.",
  },
  {
    id: "F7",
    name: "Admin Dashboard",
    priority: "P1" as const,
    complexity: "Low" as const,
    desc: "User approvals, exports, and platform health metrics.",
  },
];

export function FeatureSpecPanel({
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
            aria-label="Close overlay"
            className="fixed inset-0 z-[140] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed bottom-0 right-0 top-0 z-[150] flex w-full max-w-[420px] flex-col border-l border-dark-border bg-[#12101A] shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-dark-border p-5">
              <div>
                <h2 className="font-syne text-xl font-bold text-white">
                  Feature Specification
                </h2>
                <span className="mt-2 inline-block rounded-full bg-purple-primary/25 px-2.5 py-0.5 text-xs font-semibold text-purple-light">
                  Phase 1 of 3
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-dark-border p-2 text-text-secondary hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <ul className="space-y-4">
                {features.map((f) => (
                  <li
                    key={f.id}
                    className="rounded-xl border border-dark-border bg-dark-bg/50 p-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-text-muted">
                        {f.id}
                      </span>
                      <span className="font-syne font-semibold text-white">
                        {f.name}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                          f.priority === "P0"
                            ? "bg-purple-primary/30 text-purple-light"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {f.priority}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                          f.complexity === "Low"
                            ? "bg-green-500/20 text-green-400"
                            : f.complexity === "Medium"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {f.complexity}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-text-secondary">{f.desc}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs leading-relaxed text-text-muted">
                Phase 2 features deferred: ML scoring, email automation, mobile
                app, multi-language, Google OAuth
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
