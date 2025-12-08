import styles from "./LoadingSpinner.module.scss";

export function LoadingSpinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinnerCircle}></div>
    </div>
  );
}
