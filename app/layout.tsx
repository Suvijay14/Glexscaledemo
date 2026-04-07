import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Syne, DM_Sans, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { LayoutChrome } from "@/components/LayoutChrome";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const geistSans = GeistSans;

export const metadata: Metadata = {
  title: "PartnerMatch by GlexScale | Channel Intelligence Platform",
  description:
    "GlexScale connects SaaS vendors with the right channel partners across EMEA — scored, ranked, and explained by the GlexScale Compatibility Score (GCS).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,800,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${syne.variable} ${dmSans.variable} ${inter.variable} ${plusJakarta.variable} ${geistSans.variable} font-dm bg-dark-bg text-text-primary antialiased`}
        style={
          {
            // Alias for lib/fonts.ts — Geist package exposes --font-geist-sans
            "--font-geist": "var(--font-geist-sans)",
          } as CSSProperties
        }
      >
        <LayoutChrome>{children}</LayoutChrome>
      </body>
    </html>
  );
}
