"use client";

import { useCaptureSpirit } from "@/features/capture-spirit/model";
import type { Spirit } from "@/shared/models";
import styles from "./CaptureButton.module.scss";

type CaptureButtonProps = {
  spirit: Spirit;
  onError?: (error: Error) => void;
  onSuccess?: () => void;
};

export function CaptureButton({
  spirit,
  onError,
  onSuccess,
}: CaptureButtonProps) {
  const { mutate, isPending, isError } = useCaptureSpirit();

  const isCaptured = spirit.status === "Captured";
  // Disabled only while pending or already captured. While error - button enabled for retry
  const isDisabled = isPending || isCaptured;

  const handleClick = () => {
    if (isDisabled) return;

    mutate(spirit.id, {
      onSuccess: () => {
        onSuccess?.();
      },
      onError: (error) => {
        onError?.(error instanceof Error ? error : new Error(String(error)));
      },
    });
  };

  // Priority: error (if not captured) > loading > captured
  // Don't show error state for already captured spirits
  let buttonClass = styles.button;
  let buttonText = "Capture";

  if (isError && !isCaptured) {
    buttonClass += ` ${styles["button--error"]}`;
    buttonText = "Retry";
  } else if (isPending) {
    buttonClass += ` ${styles["button--loading"]}`;
    buttonText = "Capturing…";
  } else if (isCaptured) {
    buttonClass += ` ${styles["button--captured"]}`;
    buttonText = "Captured";
  }

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {buttonText}
    </button>
  );
}
