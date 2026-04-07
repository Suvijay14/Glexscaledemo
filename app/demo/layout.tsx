"use client";

import { useEffect, useState } from "react";
import { DashThemeProvider } from "@/context/DashThemeContext";
import { DemoShell } from "@/components/DemoShell";
import CookieBanner from "@/components/CookieBanner";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<"en" | "fr">("en");

  useEffect(() => {
    const saved = localStorage.getItem("glexLang");
    if (saved === "fr") setLang("fr");
  }, []);

  return (
    <DashThemeProvider>
      <DemoShell>{children}</DemoShell>
      <CookieBanner lang={lang} />
    </DashThemeProvider>
  );
}
