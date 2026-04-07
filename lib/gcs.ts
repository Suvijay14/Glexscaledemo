export type GCSBand =
  | "Strong Fit"
  | "Good Fit"
  | "Conditional"
  | "Weak Fit"
  | "Poor Fit";

export interface GCSBandInfo {
  band: GCSBand;
  label: string;
  color: string;
  /** Tailwind text/bg helpers where needed */
  badgeClass: string;
}

export function getGCSBand(score: number): GCSBandInfo {
  if (score >= 80) {
    return {
      band: "Strong Fit",
      label: "Strong Fit",
      color: "#22c55e",
      badgeClass: "bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/40",
    };
  }
  if (score >= 65) {
    return {
      band: "Good Fit",
      label: "Good Fit",
      color: "#84cc16",
      badgeClass: "bg-[#84cc16]/20 text-[#84cc16] border-[#84cc16]/40",
    };
  }
  if (score >= 50) {
    return {
      band: "Conditional",
      label: "Conditional",
      color: "#f59e0b",
      badgeClass: "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/40",
    };
  }
  if (score >= 35) {
    return {
      band: "Weak Fit",
      label: "Weak Fit",
      color: "#6b7280",
      badgeClass: "bg-[#6b7280]/20 text-[#6b7280] border-[#6b7280]/40",
    };
  }
  return {
    band: "Poor Fit",
    label: "Poor Fit",
    color: "#374151",
    badgeClass: "bg-[#374151]/30 text-gray-400 border-gray-600/50",
  };
}

export function dimensionBarColor(score: number, friction?: boolean): string {
  if (friction) return "#f59e0b";
  if (score >= 75) return "#22c55e";
  if (score >= 55) return "#84cc16";
  if (score >= 40) return "#f59e0b";
  return "#6b7280";
}
