"use client";

import { usePathname } from "next/navigation";
import { Menu, Bell, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useDashTheme } from "@/context/DashThemeContext";

function headerMeta(
  pathname: string | null,
  mode: "demo" | "app"
): { title: string; crumb: string } {
  const base = mode === "demo" ? "/demo" : "/app";
  const label = mode === "demo" ? "Demo" : "App";

  if (!pathname || pathname === base) {
    return { title: "Platform Overview", crumb: label };
  }
  if (pathname === `${base}/directory`) {
    return { title: "Partner Directory", crumb: `${label} / Directory` };
  }
  if (new RegExp(`^${base}/directory/[^/]+$`).test(pathname)) {
    return { title: "Partner Profile", crumb: `${label} / Directory / Profile` };
  }
  if (pathname === `${base}/dashboard`) {
    return { title: "Vendor Dashboard", crumb: `${label} / Vendor` };
  }
  if (pathname === `${base}/admin`) {
    return { title: "Admin Panel", crumb: `${label} / Administration` };
  }
  return { title: "PartnerMatch", crumb: label };
}

export function DemoHeader({
  onMenuClick,
  variant = "demo",
  userName = "TechVendor EMEA",
  userInitial = "T",
  onLogout,
}: {
  onMenuClick?: () => void;
  variant?: "demo" | "app";
  userName?: string;
  userInitial?: string;
  onLogout?: () => void;
}) {
  const pathname = usePathname();
  const { title, crumb } = headerMeta(pathname, variant);
  const { t, isDashDark } = useDashTheme();

  return (
    <header
      className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between px-4 md:left-[260px]"
      style={{
        backgroundColor: t.dashHeader,
        borderBottom: `1px solid ${t.dashHeaderBorder}`,
        transition: "background-color 0.35s ease, border-color 0.35s ease",
      }}
    >
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="rounded-lg border p-2 md:hidden"
          style={{
            borderColor: t.dashCardBorder,
            color: t.dashTextPrimary,
          }}
          aria-label="Open menu"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <motion.h1
            key={title}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="truncate font-syne text-lg font-bold md:text-xl"
            style={{
              color: isDashDark ? t.dashTextPrimary : "#1A1614",
            }}
          >
            {title}
          </motion.h1>
          <p className="truncate text-xs" style={{ color: t.dashTextMuted }}>
            {crumb}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {variant === "demo" && (
          <span
            className="hidden rounded-full px-2.5 py-1 text-xs font-semibold sm:inline"
            style={{
              backgroundColor: t.dashBadgeDemoBg,
              color: t.dashBadgeDemoText,
            }}
          >
            DEMO
          </span>
        )}
        <div
          className="flex items-center gap-2 rounded-full border py-1 pl-1 pr-2 sm:pr-3"
          style={{
            backgroundColor: isDashDark ? "#1A1625" : "#F9F7F4",
            borderColor: isDashDark ? "#1E1A2E" : "#E0D8CC",
            color: t.dashTextPrimary,
          }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-primary font-syne text-sm font-bold text-white">
            {userInitial}
          </span>
          <span
            className="hidden max-w-[140px] truncate text-sm sm:inline"
            style={{ color: t.dashTextPrimary }}
          >
            {userName}
          </span>
        </div>
        {variant === "app" && onLogout && (
          <button
            type="button"
            onClick={() => onLogout()}
            className="flex items-center gap-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors duration-[350ms] sm:px-3 sm:text-sm"
            style={{
              borderColor: t.dashCardBorder,
              color: t.dashTextSecondary,
            }}
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Log out</span>
          </button>
        )}
        <div className="relative">
          <Bell
            className="h-5 w-5"
            style={{ color: t.dashTextSecondary }}
            aria-hidden
          />
          <span
            className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full px-0.5 text-[10px] font-bold"
            style={{
              backgroundColor: t.dashGreen,
              color: isDashDark ? "#0A0A0F" : "#FFFFFF",
            }}
          >
            3
          </span>
        </div>
      </div>
    </header>
  );
}
