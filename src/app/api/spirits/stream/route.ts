import { spiritsMock } from "../_mocks";
import { spiritThreatChangedEventSchema, THREAT_LEVELS } from "@/shared/models";

export async function GET() {
  const encoder = new TextEncoder();
  let intervalId: NodeJS.Timeout | null = null;

  const stream = new ReadableStream({
    start(controller) {
      intervalId = setInterval(() => {
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
    },
    cancel() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
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
