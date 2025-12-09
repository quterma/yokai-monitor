"use client";

import { useSpiritsList } from "@/entities/spirit/api";
import { SpiritCard } from "@/entities/spirit/ui";
import type { ThreatLevel } from "@/entities/spirit/model";
import { LoadingSpinner, ErrorBox } from "@/shared/ui";
import styles from "./MonitoringDashboard.module.scss";

export function MonitoringDashboard() {
  const {
    data: spirits,
    isLoading,
    isFetching,
    isError,
    error,
  } = useSpiritsList();

  const isLoadingState = isLoading || isFetching;

  if (isLoadingState) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Spirit Monitoring Dashboard</h1>
        </header>
        <div className={styles.centerState}>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (isError) {
    const errorObj =
      error instanceof Error ? error : new Error("Failed to load spirits data");

    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Spirit Monitoring Dashboard</h1>
        </header>
        <div className={styles.centerState}>
          <ErrorBox error={errorObj} />
        </div>
      </div>
    );
  }

  const spiritsList = spirits ?? [];

  const threatCounts: Record<ThreatLevel, number> = {
    Low: 0,
    Medium: 0,
    High: 0,
    Critical: 0,
  };

  spiritsList.forEach((spirit) => {
    threatCounts[spirit.threatLevel]++;
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Spirit Monitoring Dashboard</h1>
      </header>

      <section className={styles.summary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Low:</span>
          <span className={styles.summaryValue}>{threatCounts.Low}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Medium:</span>
          <span className={styles.summaryValue}>{threatCounts.Medium}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>High:</span>
          <span className={styles.summaryValue}>{threatCounts.High}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Critical:</span>
          <span className={styles.summaryValue}>{threatCounts.Critical}</span>
        </div>
      </section>

      <section className={styles.spiritsList}>
        {spiritsList.map((spirit) => (
          <SpiritCard key={spirit.id} spirit={spirit} />
        ))}
      </section>
    </div>
  );
}
