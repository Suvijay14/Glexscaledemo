"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function FloatingDemoBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 2500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 260 }}
          className="fixed bottom-0 left-0 right-0 z-[60] flex h-[60px] items-center border-t border-dark-border px-4 shadow-[0_-8px_32px_rgba(0,0,0,0.4)]"
          style={{
            background: "rgba(10, 10, 15, 0.92)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
            <p className="min-w-0 text-sm text-text-secondary sm:text-base">
              👋 See PartnerMatch in action — explore all 5 platform features
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href="/demo"
                className="rounded-full bg-[#7DD855] px-4 py-2 text-sm font-semibold text-[#0A0A0F] transition hover:bg-green-light"
              >
                Launch Demo →
              </Link>
              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => setDismissed(true)}
                className="rounded-lg p-2 text-text-muted hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
