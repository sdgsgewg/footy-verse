// Repo Request (from zod)

import z from "zod";
import { ImagePayload } from "../image";
import {
  createRegionSchema,
  regionMutationSchema,
  regionsQuerySchema,
  updateRegionSchema,
} from "@/lib/validations/regions.schema";

export type RegionQuery = Partial<z.input<typeof regionsQuerySchema>>;
export type RegionFilter = z.infer<typeof regionsQuerySchema>;

export type RegionCreateInput = z.infer<typeof createRegionSchema>;
export type RegionUpdateInput = z.infer<typeof updateRegionSchema>;

// Mutation

export type UpsertRegionInput = z.infer<typeof regionMutationSchema> & {
  id?: string;
} & ImagePayload;
