import type { Metadata } from "next";
import { ErrorBoundary } from "@/shared/ui";
import "@/shared/styles/theme.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yokai Monitor",
  description: "Monitor yokai activity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
