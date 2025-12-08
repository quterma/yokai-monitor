import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).optional(),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV || "development",
});

export const API_SPIRITS_URL = "/api/spirits";
export const API_SPIRITS_STREAM_URL = "/api/spirits/stream";
export const retryDelayMs = 500;
export const sseReconnectDelayMs = 2000;
export const MOCK_ERROR_RATE = 0.3;
