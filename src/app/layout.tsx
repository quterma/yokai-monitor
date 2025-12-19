import type { Metadata } from "next";
import { Providers } from "./providers";
import "@/shared/styles/theme.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Yokai Monitor",
    default: "Yokai Monitor",
  },
  description:
    "Real-time yokai spirit monitoring dashboard for Tokyo anomaly tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
