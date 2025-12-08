import { spiritsMock } from "../_mocks";
import { spiritThreatChangedEventSchema } from "@/shared/models";
import type { ThreatLevel } from "@/shared/models";

const THREAT_LEVELS: ThreatLevel[] = ["Low", "Medium", "High", "Critical"];

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const intervalId = setInterval(() => {
        if (spiritsMock.length === 0) return;

        const randomSpirit =
          spiritsMock[Math.floor(Math.random() * spiritsMock.length)];
        const randomThreatLevel =
          THREAT_LEVELS[Math.floor(Math.random() * THREAT_LEVELS.length)];

        if (!randomSpirit || !randomThreatLevel) return;

        const event = spiritThreatChangedEventSchema.parse({
          id: randomSpirit.id,
          threatLevel: randomThreatLevel,
        });

        const data = `data: ${JSON.stringify(event)}\n\n`;
        controller.enqueue(encoder.encode(data));
      }, 5000);

      return () => {
        clearInterval(intervalId);
      };
    },
    cancel() {
      // Cleanup handled by start's return function
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
