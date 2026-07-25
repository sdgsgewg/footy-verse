import {
  createPositionSchema,
  positionMutationSchema,
  positionsQuerySchema,
  updatePositionSchema,
} from "@/lib/validations/positions.schema";
import z from "zod";

export type PositionQuery = Partial<z.input<typeof positionsQuerySchema>>;
export type PositionFilter = z.infer<typeof positionsQuerySchema>;

export type PositionCreateInput = z.infer<typeof createPositionSchema>;
export type PositionUpdateInput = z.infer<typeof updatePositionSchema>;

// Mutation

export type UpsertPositionInput = z.infer<typeof positionMutationSchema> & {
  id?: string;
};
