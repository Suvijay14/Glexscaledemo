/** Interlocking arcs — demo sidebar mark (green in dark theme, purple in light). */
const STROKE_DARK = { primary: "#7DD855", secondary: "#9EE876" };
const STROKE_LIGHT = { primary: "#570284", secondary: "#7B35B8" };

export function DemoLogoMark({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const s = variant === "dark" ? STROKE_DARK : STROKE_LIGHT;
  const fill = variant === "dark" ? "#0D0B14" : "#FFFFFF";
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="15" fill={fill} />
      <ellipse
        cx="16"
        cy="16"
        rx="11"
        ry="5.5"
        fill="none"
        stroke={s.primary}
        strokeWidth="1.8"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="11"
        ry="5.5"
        fill="none"
        stroke={s.secondary}
        strokeWidth="1.5"
        opacity={0.9}
        transform="rotate(60 16 16)"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="11"
        ry="5.5"
        fill="none"
        stroke={s.primary}
        strokeWidth="1.4"
        opacity={0.85}
        transform="rotate(120 16 16)"
      />
      <circle cx="16" cy="16" r="2.5" fill={s.primary} opacity={0.4} />
    </svg>
  );
}

export function DemoLogoMarkSmall({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const s = variant === "dark" ? STROKE_DARK : STROKE_LIGHT;
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="15" fill="transparent" />
      <ellipse
        cx="16"
        cy="16"
        rx="11"
        ry="5.5"
        fill="none"
        stroke={s.primary}
        strokeWidth="1.4"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="11"
        ry="5.5"
        fill="none"
        stroke={s.secondary}
        strokeWidth="1.2"
        transform="rotate(60 16 16)"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="11"
        ry="5.5"
        fill="none"
        stroke={s.primary}
        strokeWidth="1.1"
        transform="rotate(120 16 16)"
      />
    </svg>
  );
}
