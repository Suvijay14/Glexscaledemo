"use client";

/** Simplified Europe outline with green dots for covered countries (decorative). */
const dots: Record<string, { x: number; y: number }> = {
  France: { x: 48, y: 58 },
  Germany: { x: 52, y: 48 },
  "United Kingdom": { x: 42, y: 42 },
  Spain: { x: 38, y: 62 },
  Netherlands: { x: 50, y: 46 },
  Sweden: { x: 58, y: 32 },
  Italy: { x: 54, y: 62 },
  Belgium: { x: 48, y: 50 },
  Poland: { x: 58, y: 48 },
  "United Arab Emirates": { x: 72, y: 72 },
  Ireland: { x: 38, y: 44 },
  Switzerland: { x: 52, y: 56 },
  Norway: { x: 52, y: 34 },
  Finland: { x: 60, y: 30 },
  "Czech Republic": { x: 56, y: 50 },
  Portugal: { x: 34, y: 62 },
  Luxembourg: { x: 49, y: 51 },
  Austria: { x: 54, y: 52 },
  "Saudi Arabia": { x: 62, y: 78 },
  Qatar: { x: 68, y: 76 },
};

export function EuropeMap({ countries }: { countries: string[] }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-dark-border bg-dark-bg">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full text-purple-primary/40"
        aria-hidden
      >
        <path
          fill="currentColor"
          opacity={0.35}
          d="M42 38 L58 36 L62 42 L68 44 L72 52 L70 60 L64 66 L58 68 L50 70 L42 66 L36 58 L34 48 Z M48 30 L56 28 L60 34 L58 40 L52 42 Z M58 28 L66 30 L68 38 L62 40 Z"
        />
        {countries.map((c) => {
          const p = dots[c];
          if (!p) return null;
          return (
            <circle
              key={c}
              cx={p.x}
              cy={p.y}
              r={2.2}
              fill="#7DD855"
              className="drop-shadow-[0_0_6px_rgba(125,216,85,0.8)]"
            />
          );
        })}
      </svg>
      <p className="absolute bottom-2 left-2 right-2 text-center text-[10px] text-text-muted">
        Illustrative coverage map — dots indicate markets referenced in this
        profile.
      </p>
    </div>
  );
}
