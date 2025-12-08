import { z } from "zod";

export const THREAT_LEVELS = ["Low", "Medium", "High", "Critical"] as const;
export const SPIRIT_STATUSES = ["Active", "Captured"] as const;

export const threatLevelSchema = z.enum(THREAT_LEVELS);
export const spiritStatusSchema = z.enum(SPIRIT_STATUSES);

export const spiritSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  threatLevel: threatLevelSchema,
  status: spiritStatusSchema,
});

export const spiritsListSchema = z.array(spiritSchema);

export const captureRequestSchema = z.object({
  spiritId: z.string(),
});

export const captureResponseSchema = z.object({
  success: z.boolean(),
  spirit: spiritSchema,
});

export type ThreatLevel = z.infer<typeof threatLevelSchema>;
export type SpiritStatus = z.infer<typeof spiritStatusSchema>;
export type Spirit = z.infer<typeof spiritSchema>;
export type SpiritsList = z.infer<typeof spiritsListSchema>;
export type CaptureRequest = z.infer<typeof captureRequestSchema>;
export type CaptureResponse = z.infer<typeof captureResponseSchema>;
