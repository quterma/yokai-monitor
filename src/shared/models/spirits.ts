import { z } from "zod";

export const threatLevelSchema = z.enum(["Low", "Medium", "High", "Critical"]);

export const spiritStatusSchema = z.enum(["Active", "Captured"]);

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
