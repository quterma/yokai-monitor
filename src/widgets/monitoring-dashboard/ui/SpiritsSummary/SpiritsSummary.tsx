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
  colorClass?: string;
};

function SummaryItem({ label, value, colorClass }: SummaryItemProps) {
  return (
    <div className={styles.summaryItem}>
      <span className={styles.summaryValue} aria-label={`${value} ${label}`}>
        {value}
      </span>
      <span
        className={`${styles.summaryLabel} ${colorClass ? styles[colorClass] : ""}`}
      >
        {label}
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
      <SummaryItem label="Low" value={threatCounts.Low} colorClass="colorLow" />
      <SummaryItem
        label="Medium"
        value={threatCounts.Medium}
        colorClass="colorMedium"
      />
      <SummaryItem
        label="High"
        value={threatCounts.High}
        colorClass="colorHigh"
      />
      <SummaryItem
        label="Critical"
        value={threatCounts.Critical}
        colorClass="colorCritical"
      />
      <SummaryItem
        label="Active"
        value={activeCount}
        colorClass="colorActive"
      />
      <SummaryItem
        label="Captured"
        value={capturedCount}
        colorClass="colorCaptured"
      />
    </section>
  );
}
