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

// Data type for relation tables (can be used as a type for supabase query or DTO)

type ClubSummary = Pick<Tables<"clubs">, "id" | "image" | "name">;

// Supabase Query Result

// Player Career List

export type DbPlayerCareerListRow = Pick<
  PlayerCareer,
  "id" | "joined_at" | "left_at"
> & {
  club: ClubSummary;
};

// Player Career Detail

export type DbPlayerContract = Tables<"player_contracts">;

type DbPlayerShirtNumber = Tables<"player_shirt_numbers">;

type DbTransfer = Tables<"transfers"> & {
  from_club: Tables<"clubs">;
  to_club: Tables<"clubs">;
  season: Tables<"seasons">;
};

export type DbPlayerCareerDetailRow = PlayerCareer & {
  player_contracts: DbPlayerContract[];
  player_shirt_numbers: DbPlayerShirtNumber[];
  transfer: DbTransfer;
};

// API Response DTO

// Player Career List

export interface PlayerCareerListItem {
  id: string;
  joinedAt: string;
  leftAt: string | null;

  club: ClubSummary;
}

// Player Career Detail

export interface PlayerContract {
  contractStart: string;
  contractEnd: string;
  salary: number;
}

export interface PlayerShirtNumber {
  shirtNumber: number;
  startDate: string;
  endDate: string | null;
}

export interface Transfer {
  seasonId: string;
  fromClubId: string;
  toClubId: string;
  transferType: string;
  transferFee: number;
  transferDate: string;
}

// Model For Edit

export interface PlayerCareerEditResponse {
  id: string;
  clubId: string;
  joinedAt: string;
  leftAt: string | null;

  contracts: PlayerContract[];
  shirtNumbers: PlayerShirtNumber[];
  transfer: Transfer;
}

// Model View Detail

export interface PlayerCareerDetailResponse {
  id: string;
  clubId: string;
  joinedAt: string;
  leftAt: string | null;

  contracts: PlayerContract[];
  shirtNumbers: PlayerShirtNumber[];
  transfer: Transfer;
}

export interface PlayerCareerLookupResponse {
  id: string;
}

// Mutation
export type UpsertPlayerCareerInput = z.infer<
  typeof playerCareerMutationSchema
> & {
  id?: string;
};

// Others
