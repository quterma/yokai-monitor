import type { SpiritsList, ThreatLevel } from "@/entities/spirit/model";

type SpiritsSummary = {
  threatCounts: Record<ThreatLevel, number>;
  activeCount: number;
  capturedCount: number;
};

export function useSpiritsSummary(spiritsList: SpiritsList): SpiritsSummary {
  const threatCounts: Record<ThreatLevel, number> = {
    Low: 0,
    Medium: 0,
    High: 0,
    Critical: 0,
  };

  let activeCount = 0;
  let capturedCount = 0;

  spiritsList.forEach((spirit) => {
    threatCounts[spirit.threatLevel]++;
    if (spirit.status === "Active") {
      activeCount++;
    } else if (spirit.status === "Captured") {
      capturedCount++;
    }
  });

  return { threatCounts, activeCount, capturedCount };
}
