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
  const { mutate, isPending } = useCaptureSpirit();

  const isCaptured = spirit.status === "Captured";
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

  // Button has three states: default "Capture", loading "Capturing…", captured "Captured"
  // Error feedback is handled by ErrorBox in SpiritCard (not on button)
  // Retry is done by pressing "Capture" again while ErrorBox is visible
  let buttonClass = styles.button;
  let buttonText = "Capture";

  if (isPending) {
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
