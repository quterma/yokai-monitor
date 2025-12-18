import {
  spiritThreatChangedEventSchema,
  type SpiritThreatChangedEvent,
} from "@/shared/models/sse-events";

export interface SseHandlers {
  onMessage?: (event: SpiritThreatChangedEvent) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
}

export interface SseClient {
  close: () => void;
}

/**
 * Creates an SSE (Server-Sent Events) client wrapper around native EventSource.
 *
 * Purpose: Connects to SSE endpoint, validates incoming events with Zod, and dispatches to handlers.
 *
 * Returns: Client object with close() method for cleanup.
 *
 * Error behavior: Parse/validation errors logged to console and ignored (connection stays open). Connection errors trigger onError handler, caller handles reconnection.
 *
 * Notes: Events validated against SpiritThreatChangedEvent schema. Invalid events don't break the stream.
 */
export function createSseClient(
  url: string,
  handlers: SseHandlers = {}
): SseClient {
  const { onMessage, onError, onOpen } = handlers;

  const eventSource = new EventSource(url);

  eventSource.onopen = () => {
    onOpen?.();
  };

  eventSource.onmessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      const validatedEvent = spiritThreatChangedEventSchema.parse(data);
      onMessage?.(validatedEvent);
    } catch (error) {
      console.error(
        "SSE parse/validation error:",
        error,
        "| data:",
        event.data
      );
    }
  };

  eventSource.onerror = (error: Event) => {
    console.error("SSE connection error:", error);
    onError?.(error);
  };

  return {
    close: () => {
      eventSource.onopen = null;
      eventSource.onmessage = null;
      eventSource.onerror = null;
      eventSource.close();
    },
  };
}
