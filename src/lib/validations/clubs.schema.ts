import { z } from "zod";
import { idSchema, slugSchema } from "./primitives.schema";

export const clubMutationSchema = z.object({
  image: z.string().nullable().optional(),
  name: z.string().min(1).max(255),
  nation_id: idSchema.nullable(),
});

export const createClubSchema = clubMutationSchema;

export const updateClubSchema = clubMutationSchema;

export const clubSchema = clubMutationSchema.extend({
  id: idSchema,
  slug: slugSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const clubsSchema = z.array(clubSchema);

export const clubsQuerySchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),

  nationId: idSchema.optional(),
});
