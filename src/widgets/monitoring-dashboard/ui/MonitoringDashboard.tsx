"use client";

import { useSpiritsList } from "@/entities/spirit/api";
import { SpiritCard } from "@/entities/spirit/ui";
import { LoadingSpinner, ErrorBox } from "@/shared/ui";
import { useSpiritsRealtime } from "@/features/realtime-updates";
import { useSpiritsSummary } from "../lib";
import { SpiritsSummary } from "./SpiritsSummary";
import styles from "./MonitoringDashboard.module.scss";

export function MonitoringDashboard() {
  const {
    data: spirits,
    isLoading,
    isFetching,
    isError,
    error,
  } = useSpiritsList();

  useSpiritsRealtime();

  const spiritsList = spirits ?? [];
  const summaryData = useSpiritsSummary(spiritsList);

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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Spirit Monitoring Dashboard</h1>
      </header>

      <SpiritsSummary {...summaryData} />

      {spiritsList.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>No spirits found</p>
          <p className={styles.emptyDescription}>Data is mock/demo</p>
        </div>
      ) : (
        <section className={styles.spiritsList}>
          {spiritsList.map((spirit) => (
            <SpiritCard key={spirit.id} spirit={spirit} />
          ))}
        </section>
      )}
    </div>
  );
}
