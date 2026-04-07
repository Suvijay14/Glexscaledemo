export type FontOption = (typeof FONTS)[number];

export const GLEX_FONT_STORAGE_KEY = "glexFont";

/** Dispatched when the user selects a heading font (Navbar → landing page). */
export const GLEX_FONT_CHANGE_EVENT = "glexFontChange";

/** Dispatched on dropdown option hover for live hero preview (Navbar → landing page). */
export const GLEX_FONT_PREVIEW_EVENT = "glexFontPreview";

export const FONTS = [
  {
    id: "syne",
    name: "Syne",
    label: "The Original",
    description: "Current — bold and distinctive",
    cssVar: "var(--font-syne)",
    preview: "Find Partners",
    tag: "CURRENT",
    tagColor: "#570284",
  },
  {
    id: "inter",
    name: "Inter",
    label: "The Modern Classic",
    description: "Clean, readable, designed for screens",
    cssVar: "var(--font-inter)",
    preview: "Find Partners",
    tag: "POPULAR",
    tagColor: "#2563EB",
  },
  {
    id: "geist",
    name: "Geist",
    label: "The Premium Tech",
    description: "Built for SaaS — engineered look",
    cssVar: "var(--font-geist)",
    preview: "Find Partners",
    tag: "MODERN",
    tagColor: "#000000",
  },
  {
    id: "jakarta",
    name: "Plus Jakarta Sans",
    label: "The Geometric",
    description: "Friendly and open — great for sustainability",
    cssVar: "var(--font-jakarta)",
    preview: "Find Partners",
    tag: "FRIENDLY",
    tagColor: "#059669",
  },
  {
    id: "satoshi",
    name: "Satoshi",
    label: "The Bold Statement",
    description: "Sharp and high-fashion — design-forward",
    cssVar: "'Satoshi', sans-serif",
    preview: "Find Partners",
    tag: "SHARP",
    tagColor: "#DC2626",
  },
] as const;
