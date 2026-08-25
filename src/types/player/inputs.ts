import z from "zod";

import {
  createPlayerSchema,
  updatePlayerSchema,
  playersQuerySchema,
  playerMutationSchema,
  groupedPlayersQuerySchema,
} from "@/lib/validations/players.schema";
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

export type GroupedPlayerQuery = Partial<
  z.input<typeof groupedPlayersQuerySchema>
>;

export type GroupedPlayerFilter = z.infer<typeof groupedPlayersQuerySchema>;

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
  imageUrl: string | null; // public URL untuk preview
};
