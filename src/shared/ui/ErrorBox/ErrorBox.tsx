import { Button } from "../Button";
import styles from "./ErrorBox.module.scss";

interface ErrorBoxProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorBox({ message, onRetry }: ErrorBoxProps) {
  return (
    <div className={styles.errorBox}>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary">
          Retry
        </Button>
      )}
    </div>
  );
}
