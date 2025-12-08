import { z } from "zod";
import { threatLevelSchema } from "./spirits";

export const spiritThreatChangedEventSchema = z.object({
  id: z.string(),
  threatLevel: threatLevelSchema,
});

export type SpiritThreatChangedEvent = z.infer<
  typeof spiritThreatChangedEventSchema
>;
