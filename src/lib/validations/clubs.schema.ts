import { z } from "zod";

export const clubIdSchema = z.string().uuid();

const clubMutationSchema = z.object({
  image: z.string().nullable().optional(),
  name: z.string().min(1).max(255),
});

export const createClubSchema = clubMutationSchema;

export const updateClubSchema = clubMutationSchema;

export const clubSchema = clubMutationSchema.extend({
  id: clubIdSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const clubsSchema = z.array(clubSchema);

export const clubsQuerySchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),
  slug: z.string().trim().min(1).max(255).optional(),
});
