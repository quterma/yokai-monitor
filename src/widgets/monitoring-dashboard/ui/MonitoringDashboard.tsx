"use client";

import styles from "./MonitoringDashboard.module.scss";

export function MonitoringDashboard() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Spirit Monitoring Dashboard</h1>
      </header>

      <section className={styles.summary}>
        <div className={styles.summaryPlaceholder}>Summary section</div>
      </section>

      <section className={styles.spiritsList}>
        <div className={styles.spiritsPlaceholder}>Spirits list section</div>
      </section>

      <div className={styles.statePlaceholder}>
        Loading/Error state placeholder
      </div>
    </div>
  );
}
