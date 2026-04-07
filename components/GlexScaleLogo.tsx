"use client";

import Link from "next/link";

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="19" fill="#570284" />
      {/* Interlocking arcs — sphere of ellipses */}
      <ellipse
        cx="20"
        cy="20"
        rx="14"
        ry="7"
        fill="none"
        stroke="#7DD855"
        strokeWidth="2.2"
        transform="rotate(0 20 20)"
      />
      <ellipse
        cx="20"
        cy="20"
        rx="14"
        ry="7"
        fill="none"
        stroke="#9EE876"
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
        stroke="#7DD855"
        strokeWidth="2"
        opacity={0.85}
        transform="rotate(120 20 20)"
      />
      <circle cx="20" cy="20" r="3.2" fill="#7DD855" opacity={0.35} />
    </svg>
  );
}

export function GlexScaleLogo({ compact }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <LogoMark className="h-10 w-10 shrink-0 transition-transform group-hover:scale-105" />
      <div className="leading-tight">
        <span className="font-syne text-lg font-bold tracking-tight text-white">
          GlexScale
        </span>
        {!compact && (
          <p className="font-syne text-[10px] font-semibold uppercase tracking-[0.2em] text-green-accent">
            PartnerMatch
          </p>
        )}
      </div>
    </Link>
  );
}

export { LogoMark };
