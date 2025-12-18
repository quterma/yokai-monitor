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
        <div className={styles.iconWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/images/yokai/${spirit.name}.jpg`}
            alt=""
            className={styles.icon}
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.endsWith(".jpg")) {
                target.src = `/images/yokai/${spirit.name}.png`;
              } else {
                target.src = "/images/yokai/default.png";
              }
            }}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.field}>
            <span className={styles.label}>Name:</span>
            <h3 className={styles.name}>{spirit.name}</h3>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Location:</span>
            <p className={styles.location}>{spirit.location}</p>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Threat Level:</span>
            <span
              className={`${styles.threatLevel} ${styles[`threatText${spirit.threatLevel}`]}`}
            >
              {spirit.threatLevel}
            </span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Status:</span>
            <span
              className={`${styles.status} ${styles[`status${spirit.status}`]}`}
            >
              {spirit.status}
            </span>
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
