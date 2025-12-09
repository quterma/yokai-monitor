"use client";

import { Component, type ReactNode } from "react";
import { ErrorBox } from "../ErrorBox";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "var(--spacing-xl)" }}>
          <ErrorBox
            error={new Error("Something went wrong. Please try again.")}
            onClose={() => this.setState({ hasError: false })}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
