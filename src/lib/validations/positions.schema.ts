import { z } from "zod";
import { idSchema } from "./primitives.schema";

export const positionMutationSchema = z.object({
  name: z.string().min(1).max(255),
});

export const createPositionSchema = positionMutationSchema;

export const updatePositionSchema = positionMutationSchema;

export const positionSchema = positionMutationSchema.extend({
  id: idSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const positionsSchema = z.array(positionSchema);

export const positionsQuerySchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),
});
