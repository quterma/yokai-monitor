import styles from "./LoadingSpinner.module.scss";

export function LoadingSpinner() {
  return (
    <div className={styles.spinner} role="status" aria-label="Loading">
      <div className={styles.spinnerCircle}></div>
    </div>
  );
}
