// zod infer

import z from "zod";

import {
  createPlayerSchema,
  updatePlayerSchema,
  playersQuerySchema,
  playerMutationSchema,
} from "@/lib/validations/players.schema";
import { ImagePayload } from "../image";
import { createPlayerPositionSchema } from "@/lib/validations/player-positions.schema";
import { createPlayerNationalitySchema } from "@/lib/validations/player-nationalities.schema";

/**
 * Input dari client (dari URL / API route)
 */
export type PlayerQuery = Partial<z.input<typeof playersQuerySchema>>;

/**
 * Khusus dipakai setelah parse, termasuk state React
 */
export type PlayerFilter = z.infer<typeof playersQuerySchema>;

export type PlayerCreateInput = z.infer<typeof createPlayerSchema>;
export type PlayerUpdateInput = z.infer<typeof updatePlayerSchema>;

export type PlayerPositionCreateInput = z.infer<
  typeof createPlayerPositionSchema
>;

export type PlayerNationalityCreateInput = z.infer<
  typeof createPlayerNationalitySchema
>;

// Mutation

export type UpsertPlayerInput = z.infer<typeof playerMutationSchema> & {
  id?: string;
} & ImagePayload;
