import z from "zod";
import {
  confederationMutationSchema,
  confederationsQuerySchema,
  createConfederationSchema,
  updateConfederationSchema,
} from "@/lib/validations/confederations.schema";

// Repo Request (from zod)

export type ConfederationQuery = Partial<
  z.input<typeof confederationsQuerySchema>
>;
export type ConfederationFilter = z.infer<typeof confederationsQuerySchema>;

export type ConfederationCreateInput = z.infer<
  typeof createConfederationSchema
>;
export type ConfederationUpdateInput = z.infer<
  typeof updateConfederationSchema
>;

// Mutation

export type UpsertConfederationInput = z.infer<
  typeof confederationMutationSchema
> & {
  id?: string;
  imageUrl: string | null; // public URL untuk preview
};
