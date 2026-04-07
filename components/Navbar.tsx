"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Sun, Moon, ChevronDown, Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { GlexScaleLogo } from "./GlexScaleLogo";
import { cn } from "@/lib/utils";
import {
  FONTS,
  type FontOption,
  GLEX_FONT_CHANGE_EVENT,
  GLEX_FONT_PREVIEW_EVENT,
  GLEX_FONT_STORAGE_KEY,
} from "@/lib/fonts";

const DARK_NAV = {
  borderToggle: "#1E1A2E",
  toggleBg: "#1A1625",
  toggleLabel: "#A89BC2",
  scrolledBg: "rgba(10, 10, 15, 0.8)",
  link: "#A89BC2",
  linkHover: "#FFFFFF",
  menuBtnBorder: "#1E1A2E",
  menuBtnText: "#FFFFFF",
  mobileSheetBg: "rgba(10, 10, 15, 0.95)",
};

const LIGHT_NAV = {
  borderToggle: "#D0C8B8",
  toggleBg: "#FFFFFF",
  toggleLabel: "#666666",
  scrolledBg: "rgba(245, 240, 232, 0.85)",
  link: "#666666",
  linkHover: "#1A1614",
  menuBtnBorder: "#D0C8B8",
  menuBtnText: "#1A1614",
  mobileSheetBg: "rgba(245, 240, 232, 0.98)",
};

/**
 * Option B: lift state in a parent and pass these props (e.g. if `LayoutChrome` renders `<Navbar {...fontProps} />`).
 * Today `LayoutChrome` mounts `<Navbar />` without props, so the navbar keeps local font state and syncs the landing page via `glexFontChange` / `glexFontPreview` on `window`.
 */
export interface NavbarProps {
  isDark?: boolean;
  toggleTheme?: () => void;
  activeFont?: string;
  setActiveFont?: (id: string) => void;
  currentFont?: FontOption;
  fontDropdownOpen?: boolean;
  setFontDropdownOpen?: (open: boolean) => void;
  previewFont?: string | null;
  setPreviewFont?: (id: string | null) => void;
  lang?: "en" | "fr";
  toggleLang?: () => void;
}

function LightHomeLogo() {
  return (
    <Link href="/" className="group flex min-w-0 items-center gap-3">
      <svg
        viewBox="0 0 40 40"
        className="h-10 w-10 shrink-0 transition-transform group-hover:scale-105"
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="19" fill="#570284" />
        <ellipse
          cx="20"
          cy="20"
          rx="14"
          ry="7"
          fill="none"
          stroke="#D4B8E8"
          strokeWidth="2.2"
          transform="rotate(0 20 20)"
        />
        <ellipse
          cx="20"
          cy="20"
          rx="14"
          ry="7"
          fill="none"
          stroke="#E8D4F5"
          strokeWidth="2"
          opacity={0.95}
          transform="rotate(60 20 20)"
        />
        <ellipse
          cx="20"
          cy="20"
          rx="14"
          ry="7"
          fill="none"
          stroke="#C4A8DC"
          strokeWidth="2"
          opacity={0.85}
          transform="rotate(120 20 20)"
        />
        <circle cx="20" cy="20" r="3.2" fill="#D4B8E8" opacity={0.45} />
      </svg>
      <div className="leading-tight">
        <span
          className="font-syne text-lg font-bold tracking-tight"
          style={{ color: "#1A1614" }}
        >
          GlexScale
        </span>
        <p
          className="font-syne text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: "#570284" }}
        >
          PartnerMatch
        </p>
      </div>
    </Link>
  );
}

export function Navbar(props: NavbarProps = {}) {
  const {
    activeFont: activeFontProp,
    setActiveFont: setActiveFontProp,
    currentFont: currentFontProp,
    fontDropdownOpen: fontDropdownOpenProp,
    setFontDropdownOpen: setFontDropdownOpenProp,
    setPreviewFont: setPreviewFontProp,
    lang: langProp,
  } = props;

  const pathname = usePathname();
  const isHome = pathname === "/";

  /** Option B: all pieces provided by a parent (e.g. future Layout wrapper). */
  const fontControlled =
    activeFontProp !== undefined &&
    typeof setActiveFontProp === "function" &&
    fontDropdownOpenProp !== undefined &&
    typeof setFontDropdownOpenProp === "function";

  const [internalActiveFont, setInternalActiveFont] = useState("syne");
  const [internalDropdownOpen, setInternalDropdownOpen] = useState(false);

  const activeFont = fontControlled ? activeFontProp! : internalActiveFont;
  const setActiveFont = fontControlled
    ? setActiveFontProp!
    : setInternalActiveFont;
  const fontDropdownOpen = fontControlled
    ? fontDropdownOpenProp!
    : internalDropdownOpen;
  const setFontDropdownOpen = fontControlled
    ? setFontDropdownOpenProp!
    : setInternalDropdownOpen;

  const currentFont =
    currentFontProp ?? FONTS.find((f) => f.id === activeFont) ?? FONTS[0];

  const fontMenuRef = useRef<HTMLDivElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [internalLang, setInternalLang] = useState<"en" | "fr">("en");

  useEffect(() => {
    if (fontControlled) return;
    const saved = localStorage.getItem(GLEX_FONT_STORAGE_KEY);
    if (saved && FONTS.some((f) => f.id === saved)) {
      setInternalActiveFont(saved);
    }
  }, [fontControlled]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("glexTheme");
    if (saved === "light") setIsDark(false);
  }, []);

  useEffect(() => {
    if (langProp) return;
    const saved = localStorage.getItem("glexLang");
    if (saved === "fr") setInternalLang("fr");
  }, [langProp]);

  useEffect(() => {
    if (!fontDropdownOpen) return;
    const handle = (e: MouseEvent) => {
      if (
        fontMenuRef.current &&
        !fontMenuRef.current.contains(e.target as Node)
      ) {
        setFontDropdownOpen(false);
        window.dispatchEvent(
          new CustomEvent(GLEX_FONT_PREVIEW_EVENT, {
            detail: { fontId: null },
          })
        );
        setPreviewFontProp?.(null);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [fontDropdownOpen, setFontDropdownOpen, setPreviewFontProp]);

  const navTheme = isHome && !isDark ? LIGHT_NAV : DARK_NAV;
  const showMarketingLight = isHome && !isDark;

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("glexTheme", next ? "dark" : "light");
    window.dispatchEvent(
      new CustomEvent("glexThemeChange", { detail: { isDark: next } })
    );
  };

  const switchFont = (fontId: string) => {
    setActiveFont(fontId);
    localStorage.setItem(GLEX_FONT_STORAGE_KEY, fontId);
    setFontDropdownOpen(false);
    window.dispatchEvent(
      new CustomEvent(GLEX_FONT_CHANGE_EVENT, { detail: { fontId } })
    );
    window.dispatchEvent(
      new CustomEvent(GLEX_FONT_PREVIEW_EVENT, { detail: { fontId: null } })
    );
    setPreviewFontProp?.(null);
  };

  const lang = langProp ?? internalLang;
  const rightActions = (
    <div className="flex items-center gap-3">
      <Link
        href="/demo"
        className="rounded-full bg-[#7DD855] px-5 py-2.5 text-sm font-semibold text-[#0A0A0F] transition hover:bg-[#9EE876]"
      >
        {lang === "en" ? "Try Demo →" : "Essayer la Démo →"}
      </Link>
    </div>
  );

  const themeToggle = isHome ? (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 transition-all duration-300"
      style={{
        borderColor: navTheme.borderToggle,
        backgroundColor: navTheme.toggleBg,
      }}
    >
      {isDark ? (
        <Sun size={14} className="text-yellow-400" />
      ) : (
        <Moon size={14} style={{ color: "#570284" }} />
      )}
      <span
        className="text-xs font-medium"
        style={{ color: navTheme.toggleLabel }}
      >
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  ) : null;

  const fontSwitcher = isHome ? (
    <div ref={fontMenuRef} className="relative">
      <button
        type="button"
        onClick={() => setFontDropdownOpen(!fontDropdownOpen)}
        className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all duration-200"
        style={{
          borderColor: isDark ? "#1E1A2E" : "#D0C8B8",
          backgroundColor: fontDropdownOpen
            ? "#570284"
            : isDark
              ? "#1A1625"
              : "#FFFFFF",
          fontFamily: currentFont.cssVar,
        }}
      >
        <span
          className="text-sm font-bold"
          style={{
            color: fontDropdownOpen
              ? "#FFFFFF"
              : isDark
                ? "#A89BC2"
                : "#666666",
            fontFamily: currentFont.cssVar,
          }}
        >
          Aa
        </span>
        <span
          className="hidden text-xs sm:block"
          style={{
            color: fontDropdownOpen
              ? "#FFFFFF"
              : isDark
                ? "#6B5F82"
                : "#888888",
          }}
        >
          {currentFont.name.split(" ")[0]}
        </span>
        <ChevronDown
          size={12}
          style={{
            color: fontDropdownOpen
              ? "#FFFFFF"
              : isDark
                ? "#6B5F82"
                : "#888888",
            transform: fontDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>

      <AnimatePresence>
        {fontDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onMouseLeave={() => {
              window.dispatchEvent(
                new CustomEvent(GLEX_FONT_PREVIEW_EVENT, {
                  detail: { fontId: null },
                })
              );
              setPreviewFontProp?.(null);
            }}
            className="absolute right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border"
            style={{
              width: "280px",
              backgroundColor: isDark ? "#12101A" : "#FFFFFF",
              borderColor: isDark ? "#1E1A2E" : "#D0C8B8",
              boxShadow: isDark
                ? "0 20px 60px rgba(0,0,0,0.6)"
                : "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            <div
              className="border-b px-4 py-3"
              style={{ borderColor: isDark ? "#1E1A2E" : "#D0C8B8" }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: isDark ? "#6B5F82" : "#888888" }}
              >
                Choose Heading Font
              </p>
            </div>

            {FONTS.map((font) => (
              <button
                key={font.id}
                type="button"
                onClick={() => switchFont(font.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-150"
                style={{
                  backgroundColor:
                    activeFont === font.id
                      ? isDark
                        ? "#1A0A2E"
                        : "#F5F0FF"
                      : "transparent",
                  borderLeft:
                    activeFont === font.id
                      ? "3px solid #570284"
                      : "3px solid transparent",
                }}
                onMouseEnter={(e) => {
                  window.dispatchEvent(
                    new CustomEvent(GLEX_FONT_PREVIEW_EVENT, {
                      detail: { fontId: font.id },
                    })
                  );
                  setPreviewFontProp?.(font.id);
                  if (activeFont !== font.id) {
                    e.currentTarget.style.backgroundColor = isDark
                      ? "#1A1625"
                      : "#F9F7FF";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFont !== font.id) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <div className="w-16 flex-shrink-0">
                  <span
                    className="text-lg font-bold"
                    style={{
                      fontFamily: font.cssVar,
                      color:
                        activeFont === font.id
                          ? "#570284"
                          : isDark
                            ? "#FFFFFF"
                            : "#1A1614",
                    }}
                  >
                    {font.preview}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-center gap-2">
                    <span
                      className="truncate text-sm font-semibold"
                      style={{
                        color: isDark ? "#FFFFFF" : "#1A1614",
                        fontFamily: font.cssVar,
                      }}
                    >
                      {font.name}
                    </span>
                    <span
                      className="flex-shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                      style={{
                        backgroundColor: `${font.tagColor}20`,
                        color: font.tagColor,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {font.tag}
                    </span>
                  </div>
                  <p
                    className="truncate text-xs"
                    style={{ color: isDark ? "#6B5F82" : "#888888" }}
                  >
                    {font.description}
                  </p>
                </div>

                {activeFont === font.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex-shrink-0"
                  >
                    <Check size={14} style={{ color: "#570284" }} />
                  </motion.div>
                )}
              </button>
            ))}

            <div
              className="border-t px-4 py-2"
              style={{ borderColor: isDark ? "#1E1A2E" : "#D0C8B8" }}
            >
              <p
                className="text-xs"
                style={{ color: isDark ? "#6B5F82" : "#AAAAAA" }}
              >
                Font applies to headings only · Saved automatically
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : null;

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] transition-all duration-300",
        scrolled
          ? "border-b backdrop-blur-md"
          : "border-b border-transparent"
      )}
      style={{
        backgroundColor: scrolled ? navTheme.scrolledBg : "transparent",
        borderBottomColor: scrolled
          ? showMarketingLight
            ? "#D0C8B8"
            : "#1E1A2E"
          : "transparent",
        transition:
          "background-color 0.4s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
          {isHome && !isDark ? <LightHomeLogo /> : <GlexScaleLogo />}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {fontSwitcher}
          {themeToggle}
          <div className="hidden md:block">{rightActions}</div>

          <button
            type="button"
            className="rounded-lg border p-2 md:hidden"
            style={{
              borderColor: navTheme.menuBtnBorder,
              color: navTheme.menuBtnText,
            }}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="border-t px-4 py-4 md:hidden"
          style={{
            borderColor: showMarketingLight ? "#D0C8B8" : "#1E1A2E",
            backgroundColor: navTheme.mobileSheetBg,
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex flex-col gap-3">
            <Link
              href="/demo"
              className="rounded-full bg-[#7DD855] py-2.5 text-center text-sm font-semibold text-[#0A0A0F]"
              onClick={() => setOpen(false)}
            >
              {lang === "en" ? "Try Demo →" : "Essayer la Démo →"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
