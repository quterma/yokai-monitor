import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).optional(),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV || "development",
});

function parseNumber(value: string | undefined, defaultValue: number): number {
  if (!value) return defaultValue;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? defaultValue : parsed;
}

function parseFloatValue(
  value: string | undefined,
  defaultValue: number
): number {
  if (!value) return defaultValue;
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? defaultValue : parsed;
}

export const API_SPIRITS_URL = "/api/spirits";
export const API_SPIRITS_STREAM_URL = "/api/spirits/stream";

export const retryDelayMs = 500;
export const sseReconnectDelayMs = parseNumber(
  process.env.SSE_RECONNECT_DELAY_MS,
  2000
);
export const sseEventIntervalMs = parseNumber(
  process.env.SSE_EVENT_INTERVAL_MS,
  5000
);
export const captureDelayMs = parseNumber(process.env.CAPTURE_DELAY_MS, 2500);
console.log(captureDelayMs);

export const MOCK_ERROR_RATE = parseFloatValue(
  process.env.MOCK_ERROR_RATE,
  0.3
);
