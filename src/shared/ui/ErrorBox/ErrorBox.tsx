import styles from "./ErrorBox.module.scss";

interface ErrorBoxProps {
  error: Error;
  onClose?: () => void;
}

export function ErrorBox({ error, onClose }: ErrorBoxProps) {
  return (
    <div className={styles.errorBox}>
      <p className={styles.message}>{error.message}</p>
      {onClose && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close error"
        >
          ×
        </button>
      )}
    </div>
  );
}
