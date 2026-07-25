// zod infer

import {
  clubMutationSchema,
  clubsQuerySchema,
  createClubSchema,
  updateClubSchema,
} from "@/lib/validations/clubs.schema";
import z from "zod";
import { ImagePayload } from "../image";

/**
 * Input dari client (dari URL / API route)
 */
export type ClubQuery = Partial<z.input<typeof clubsQuerySchema>>;

/**
 * Khusus dipakai setelah parse, termasuk state React
 */
export type ClubFilter = z.infer<typeof clubsQuerySchema>;

export type ClubCreateInput = z.infer<typeof createClubSchema>;
export type ClubUpdateInput = z.infer<typeof updateClubSchema>;

// Mutation

export type UpsertClubInput = z.infer<typeof clubMutationSchema> & {
  id?: string;
} & ImagePayload;
