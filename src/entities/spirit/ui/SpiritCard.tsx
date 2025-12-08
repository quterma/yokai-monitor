import type { Spirit } from "@/entities/spirit/model";
import styles from "./SpiritCard.module.scss";

type SpiritCardProps = {
  spirit: Spirit;
  onCapture?: (id: string) => void;
};

export function SpiritCard({ spirit, onCapture }: SpiritCardProps) {
  const isCaptured = spirit.status === "Captured";
  const threatClass = `threat${spirit.threatLevel}`;

  return (
    <article className={styles.card}>
      <div className={`${styles.threat} ${styles[threatClass]}`} />
      <div className={styles.content}>
        <h3 className={styles.name}>{spirit.name}</h3>
        <p className={styles.location}>{spirit.location}</p>
        <div className={styles.meta}>
          <span className={styles.threatLevel}>
            Threat: {spirit.threatLevel}
          </span>
          <span className={styles.status}>{spirit.status}</span>
        </div>
      </div>
      <button
        className={styles.captureButton}
        onClick={() => onCapture?.(spirit.id)}
        disabled={isCaptured}
      >
        {isCaptured ? "Captured" : "Capture"}
      </button>
    </article>
  );
}
