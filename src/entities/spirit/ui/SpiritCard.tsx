"use client";

import { useState } from "react";
import type { Spirit } from "@/entities/spirit/model";
import { CaptureButton } from "@/features/capture-spirit/ui/CaptureButton";
import { ErrorBox } from "@/shared/ui/ErrorBox";
import styles from "./SpiritCard.module.scss";

type SpiritCardProps = {
  spirit: Spirit;
};

export function SpiritCard({ spirit }: SpiritCardProps) {
  const [captureError, setCaptureError] = useState<Error | null>(null);
  const threatClass = `threat${spirit.threatLevel}`;

  return (
    <div className={styles.cardWithError}>
      <div className={styles.cardErrorSlot}>
        {captureError && (
          <ErrorBox
            error={captureError}
            onClose={() => setCaptureError(null)}
          />
        )}
      </div>

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
        <CaptureButton
          spirit={spirit}
          onClick={() => setCaptureError(null)}
          onError={(err) => setCaptureError(err)}
        />
      </article>
    </div>
  );
}
