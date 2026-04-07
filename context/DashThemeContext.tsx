"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const DARK_DASH_TOKENS = {
  dashBg: "#0A0A0F",
  dashSidebar: "#0D0B14",
  dashSidebarBorder: "#1E1A2E",
  dashHeader: "#0A0A0F",
  dashHeaderBorder: "#1E1A2E",
  dashCard: "#12101A",
  dashCardBorder: "#1E1A2E",
  dashCardHoverBorder: "#570284",
  dashTextPrimary: "#FFFFFF",
  dashTextSecondary: "#A89BC2",
  dashTextMuted: "#6B5F82",
  dashNavActiveBg: "#1A0A2E",
  dashNavActiveBorder: "#570284",
  dashNavActiveText: "#FFFFFF",
  dashNavInactiveText: "#A89BC2",
  dashNavHoverBg: "#1A1625",
  dashSectionLabel: "#6B5F82",
  dashBadgeDemoBg: "#2A1F00",
  dashBadgeDemoText: "#F59E0B",
  dashGreen: "#7DD855",
  dashPurple: "#570284",
  dashVersionText: "#6B5F82",
} as const;

export const LIGHT_DASH_TOKENS = {
  dashBg: "#F5F0E8",
  dashSidebar: "#FFFFFF",
  dashSidebarBorder: "#E0D8CC",
  dashHeader: "#FFFFFF",
  dashHeaderBorder: "#E0D8CC",
  dashCard: "#FFFFFF",
  dashCardBorder: "#E0D8CC",
  dashCardHoverBorder: "#570284",
  dashTextPrimary: "#1A1614",
  dashTextSecondary: "#555555",
  dashTextMuted: "#999999",
  dashNavActiveBg: "#F5F0FF",
  dashNavActiveBorder: "#570284",
  dashNavActiveText: "#1A1614",
  dashNavInactiveText: "#666666",
  dashNavHoverBg: "#F9F7F4",
  dashSectionLabel: "#AAAAAA",
  dashBadgeDemoBg: "#FEF3C7",
  dashBadgeDemoText: "#92400E",
  dashGreen: "#4A9E2E",
  dashPurple: "#570284",
  dashVersionText: "#AAAAAA",
} as const;

export type DashTokens = {
  [K in keyof typeof DARK_DASH_TOKENS]: string;
};

/** GCS dimension / circular track — theme-specific empty track only; fills stay semantic. */
export const DASH_GCS_TRACK = {
  dark: "#1E1A2E",
  light: "#E8E0F0",
} as const;

const STORAGE_KEY = "glexDashboardTheme";

export interface DashThemeContextType {
  isDashDark: boolean;
  toggleDashTheme: () => void;
  t: DashTokens;
}

const DashThemeContext = createContext<DashThemeContextType | null>(null);

export function DashThemeProvider({ children }: { children: ReactNode }) {
  const [isDashDark, setIsDashDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light") setIsDashDark(false);
  }, []);

  const toggleDashTheme = useCallback(() => {
    setIsDashDark((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      return next;
    });
  }, []);

  const t = useMemo(
    () => (isDashDark ? DARK_DASH_TOKENS : LIGHT_DASH_TOKENS),
    [isDashDark]
  );

  const value = useMemo(
    () => ({ isDashDark, toggleDashTheme, t }),
    [isDashDark, toggleDashTheme, t]
  );

  return (
    <DashThemeContext.Provider value={value}>
      {children}
    </DashThemeContext.Provider>
  );
}

export function useDashTheme(): DashThemeContextType {
  const ctx = useContext(DashThemeContext);
  if (!ctx) {
    throw new Error("useDashTheme must be used within DashThemeProvider");
  }
  return ctx;
}

export function gcsTrackColor(isDark: boolean): string {
  return isDark ? DASH_GCS_TRACK.dark : DASH_GCS_TRACK.light;
}
