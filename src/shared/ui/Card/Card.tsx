import { type HTMLAttributes } from "react";
import styles from "./Card.module.scss";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={`${styles.card} ${className || ""}`} {...props}>
      {children}
    </div>
  );
}
