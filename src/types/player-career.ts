import z from "zod";

import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";
import {
  createPlayerCareerSchema,
  playerCareerMutationSchema,
  updatePlayerCareerSchema,
} from "@/lib/validations/player-careers.schema";
import { createPlayerContractSchema } from "@/lib/validations/player-contracts.schema";
import { createPlayerShirtNumberSchema } from "@/lib/validations/player-shirt-numbers.schema";
import { createTransferSchema } from "@/lib/validations/transfers.schema";

// Supabase Table
export type PlayerCareer = Tables<"player_careers">;
export type PlayerCareerInsert = TablesInsert<"player_careers">;
export type PlayerCareerUpdate = TablesUpdate<"player_careers">;

// Repo Request (from zod)
export type PlayerCareerCreateInput = z.infer<typeof createPlayerCareerSchema>;
export type PlayerCareerUpdateInput = z.infer<typeof updatePlayerCareerSchema>;

export type PlayerContractCreateInput = z.infer<
  typeof createPlayerContractSchema
>;
export type PlayerShirtNumberCreateInput = z.infer<
  typeof createPlayerShirtNumberSchema
>;
export type TransferCreateInput = z.infer<typeof createTransferSchema>;

// Hasil query supabase
export type PlayerContract = Tables<"player_contracts">;
type PlayerShirtNumber = Tables<"player_shirt_numbers">;
type Transfer = Tables<"transfers"> & {
  from_club: Tables<"clubs">;
  to_club: Tables<"clubs">;
  season: Tables<"seasons">;
};

type ClubSummary = Pick<Tables<"clubs">, "id" | "image" | "name">;

export type DbPlayerCareerListRow = Pick<
  PlayerCareer,
  "id" | "joined_at" | "left_at"
> & {
  club: ClubSummary;
};

export type DbPlayerCareerDetailRow = PlayerCareer & {
  player_contracts: PlayerContract[];
  player_shirt_numbers: PlayerShirtNumber[];
  transfer: Transfer;
};

// API Response DTO
export interface PlayerCareerListItem {
  id: string;
  joined_at: string;
  left_at: string | null;

  club: {
    id: string;
    name: string;
    image: string | null;
  };
}

export type PlayerCareerDetailResponse = PlayerCareer & {
  contracts: PlayerContract[];
  shirt_numbers: PlayerShirtNumber[];
  transfer: Transfer;
};

// Mutation
export type UpsertPlayerCareerInput = z.infer<
  typeof playerCareerMutationSchema
> & {
  id?: string;
};

// Others
