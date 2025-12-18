"use client";

import { useCaptureSpirit } from "@/features/capture-spirit/model";
import type { Spirit } from "@/shared/models";
import styles from "./CaptureButton.module.scss";

type CaptureButtonProps = {
  spirit: Spirit;
  onClick?: () => void;
  onError?: (error: Error) => void;
};

export function CaptureButton({
  spirit,
  onClick,
  onError,
}: CaptureButtonProps) {
  const { mutate, isPending } = useCaptureSpirit();

  const isCaptured = spirit.status === "Captured";
  const isDisabled = isPending || isCaptured;

  const handleClick = () => {
    if (isDisabled) return;

    onClick?.();

    mutate(spirit.id, {
      onError: (error) => {
        onError?.(error instanceof Error ? error : new Error(String(error)));
      },
    });
  };

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
      aria-label={
        isCaptured
          ? `${spirit.name} already captured`
          : isPending
            ? `Capturing ${spirit.name}`
            : `Capture ${spirit.name}`
      }
    >
      {buttonText}
    </button>
  );
}
