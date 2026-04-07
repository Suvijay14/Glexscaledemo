import { getGCSBand } from "@/lib/gcs";
import { cn } from "@/lib/utils";

export function GCSScoreBadge({
  score,
  className,
  large,
}: {
  score: number;
  className?: string;
  large?: boolean;
}) {
  const info = getGCSBand(score);
  return (
    <div
      className={cn(
        "inline-flex flex-col items-end rounded-xl border px-3 py-2",
        info.badgeClass,
        large && "px-4 py-3",
        className
      )}
    >
      <span
        className={cn(
          "font-syne font-bold tabular-nums leading-none",
          large ? "text-4xl" : "text-2xl"
        )}
        style={{ color: info.color }}
      >
        {score}
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
        {info.label}
      </span>
    </div>
  );
}
