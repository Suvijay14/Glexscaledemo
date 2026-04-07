"use client";

import { DashThemeProvider } from "@/context/DashThemeContext";
import { DemoShell } from "@/components/DemoShell";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashThemeProvider>
      <DemoShell>{children}</DemoShell>
    </DashThemeProvider>
  );
}
