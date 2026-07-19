import { ClubType } from "@/enums/ClubType";
import { z } from "zod";

export const clubIdSchema = z.string().uuid();
export const clubSlugSchema = z.string();

export const clubMutationSchema = z.object({
  image: z.string().nullable().optional(),
  name: z.string().min(1).max(255),
  club_type: z.enum([
    ClubType.FIRST_TEAM,
    ClubType.B_TEAM,
    ClubType.RESERVE,
    ClubType.U23,
    ClubType.U21,
    ClubType.U19,
    ClubType.U18,
    ClubType.U17,
    ClubType.ACADEMY,
  ]),
  nation_id: z.string().uuid(),
  parent_club_id: z.string().uuid().nullable().optional(),
});

export const createClubSchema = clubMutationSchema;

export const updateClubSchema = clubMutationSchema;

export const clubSchema = clubMutationSchema.extend({
  id: clubIdSchema,
  slug: clubSlugSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const clubsSchema = z.array(clubSchema);

export const clubsQuerySchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),

  nationId: z.string().uuid().optional(),

  clubType: z.string().optional(),
});
