"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createSseClient, type SseClient } from "@/shared/lib/realtime";
import { API_SPIRITS_STREAM_URL, sseReconnectDelayMs } from "@/shared/config";
import { SPIRITS_QUERY_KEY } from "@/entities/spirit/api/queryKeys";
import type { SpiritsList } from "@/entities/spirit/model";
import type { SpiritThreatChangedEvent } from "@/shared/models/sse-events";

/**
 * Subscribes to real-time spirit threat level updates via Server-Sent Events.
 *
 * Purpose: Establishes SSE connection to receive live threat changes and updates TanStack Query cache immediately.
 *
 * Effects: Updates spirits list cache when SSE events arrive. No return value (side-effect only hook).
 *
 * Error behavior: Logs errors to console, closes connection, and auto-reconnects after 2s delay. Reconnection continues until component unmounts.
 *
 * Notes: Mock SSE sends random threat changes every 5s. No throttling - cache updates instantly on each event.
 */
export function useSpiritsRealtime() {
  const queryClient = useQueryClient();
  const sseClientRef = useRef<SseClient | null>(null);
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    function connectToSse() {
      if (!isMountedRef.current) return;
      if (sseClientRef.current) return;

      sseClientRef.current = createSseClient(API_SPIRITS_STREAM_URL, {
        onMessage: (event: SpiritThreatChangedEvent) => {
          queryClient.setQueryData<SpiritsList>(
            SPIRITS_QUERY_KEY,
            (oldData) => {
              if (!oldData) return oldData;

              return oldData.map((spirit) =>
                spirit.id === event.id
                  ? { ...spirit, threatLevel: event.threatLevel }
                  : spirit
              );
            }
          );
        },

        onError: (error) => {
          console.error("SSE connection failed, reconnecting...", error);

          if (sseClientRef.current) {
            sseClientRef.current.close();
            sseClientRef.current = null;
          }

          if (reconnectTimerRef.current) {
            clearTimeout(reconnectTimerRef.current);
            reconnectTimerRef.current = null;
          }

          if (isMountedRef.current) {
            reconnectTimerRef.current = setTimeout(() => {
              connectToSse();
            }, sseReconnectDelayMs);
          }
        },
      });
    }

    connectToSse();

    return () => {
      isMountedRef.current = false;

      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }

      if (sseClientRef.current) {
        sseClientRef.current.close();
        sseClientRef.current = null;
      }
    };
  }, [queryClient]);
}
