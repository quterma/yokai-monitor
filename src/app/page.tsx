"use client";

import { useSpiritsList } from "@/entities/spirit/api";
import { SpiritCard } from "@/entities/spirit/ui";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import { ErrorBox } from "@/shared/ui/ErrorBox";

export default function Home() {
  const { data: spirits, isLoading, error } = useSpiritsList();

  if (isLoading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem" }}>
        <ErrorBox error={error as Error} />
      </div>
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>Yokai Monitor - Test Page</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {spirits?.map((spirit) => (
          <SpiritCard key={spirit.id} spirit={spirit} />
        ))}
      </div>
    </main>
  );
}
