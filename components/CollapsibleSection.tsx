"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useDashTheme } from "@/context/DashThemeContext";

export function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const { t } = useDashTheme();

  return (
    <div
      className="rounded-2xl border"
      style={{
        borderColor: t.dashCardBorder,
        backgroundColor: t.dashCard,
        transition: "background-color 0.35s ease, border-color 0.35s ease",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-4 text-left font-syne text-lg font-semibold"
        style={{ color: t.dashTextPrimary }}
      >
        {title}
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          style={{ color: t.dashTextMuted }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
            style={{ borderTop: `1px solid ${t.dashCardBorder}` }}
          >
            <div className="px-5 py-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
