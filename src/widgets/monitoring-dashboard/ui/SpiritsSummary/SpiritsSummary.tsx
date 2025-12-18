import type { ThreatLevel } from "@/entities/spirit/model";
import styles from "./SpiritsSummary.module.scss";

type SpiritsSummaryProps = {
  threatCounts: Record<ThreatLevel, number>;
  activeCount: number;
  capturedCount: number;
};

type SummaryItemProps = {
  label: string;
  value: number;
};

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className={styles.summaryItem}>
      <span className={styles.summaryLabel}>{label}:</span>
      <span className={styles.summaryValue} aria-label={`${value} ${label}`}>
        {value}
      </span>
    </div>
  );
}

export function SpiritsSummary({
  threatCounts,
  activeCount,
  capturedCount,
}: SpiritsSummaryProps) {
  return (
    <section className={styles.summary} aria-label="Spirit statistics">
      <SummaryItem label="Low" value={threatCounts.Low} />
      <SummaryItem label="Medium" value={threatCounts.Medium} />
      <SummaryItem label="High" value={threatCounts.High} />
      <SummaryItem label="Critical" value={threatCounts.Critical} />
      <SummaryItem label="Active" value={activeCount} />
      <SummaryItem label="Captured" value={capturedCount} />
    </section>
  );
}
