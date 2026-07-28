import {
  createNationalitySchema,
  nationalitiesQuerySchema,
  nationalityMutationSchema,
  updateNationalitySchema,
} from "@/lib/validations/nationalities.schema";
import z from "zod";
import { ImagePayload } from "../image";

// Repo Request (from zod)

export type NationalityQuery = Partial<
  z.input<typeof nationalitiesQuerySchema>
>;
export type NationalityFilter = z.infer<typeof nationalitiesQuerySchema>;

export type NationalityCreateInput = z.infer<typeof createNationalitySchema>;
export type NationalityUpdateInput = z.infer<typeof updateNationalitySchema>;

// Mutation

export type UpsertNationalityInput = z.infer<
  typeof nationalityMutationSchema
> & {
  id?: string;
} & ImagePayload;
