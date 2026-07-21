import z from "zod";

import { ImagePayload } from "./image";
import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";
import {
  createPlayerSchema,
  playerMutationSchema,
  playersQuerySchema,
  updatePlayerSchema,
} from "@/lib/validations/players.schema";
import { createPlayerPositionSchema } from "@/lib/validations/player-positions.schema";
import { createPlayerCareerSchema } from "@/lib/validations/player-careers.schema";
import { createPlayerNationalTeamSchema } from "@/lib/validations/player-national-teams.schema";

// Supabase Table
export type Player = Tables<"players">;
export type PlayerInsert = TablesInsert<"players">;
export type PlayerUpdate = TablesUpdate<"players">;

// Repo Request (from zod)
export type GetPlayersParams = z.infer<typeof playersQuerySchema>;
export type PlayerCreateInput = z.infer<typeof createPlayerSchema>;
export type PlayerUpdateInput = z.infer<typeof updatePlayerSchema>;

export type PlayerPositionCreateInput = z.infer<
  typeof createPlayerPositionSchema
>;
export type PlayerCareerCreateInput = z.infer<typeof createPlayerCareerSchema>;
export type PlayerNationalTeamCreateInput = z.infer<
  typeof createPlayerNationalTeamSchema
>;

// Data type for relation tables (can be used as a type for supabase query or DTO)

export type PositionSummary = Pick<Tables<"positions">, "id" | "name">;

export type ClubSummary = Pick<Tables<"clubs">, "id" | "name" | "image">;

export type NationalitySummary = Pick<
  Tables<"nationalities">,
  "id" | "name" | "image"
>;

export type ContractSummary = Pick<
  Tables<"player_contracts">,
  "contract_start" | "contract_end"
>;

export type ShirtNumberSummary = Pick<
  Tables<"player_shirt_numbers">,
  "start_date" | "end_date" | "shirt_number"
>;

// Supabase Query Result

// Player List

export type DbPlayerPosition = Pick<
  Tables<"player_positions">,
  "display_order"
> & {
  position: PositionSummary;
};

export type DbPlayerCareer = Pick<
  Tables<"player_careers">,
  "id" | "joined_at" | "left_at" | "club_id"
> & {
  club: ClubSummary;
  player_shirt_numbers: ShirtNumberSummary[];
};

export type DbPlayerNationalTeam = Pick<
  Tables<"player_national_teams">,
  "id" | "label" | "start_date" | "end_date" | "shirt_number" | "nation_id"
> & {
  nationality: NationalitySummary;
};

export type DbPlayerListRow = Pick<
  Player,
  "id" | "image" | "name" | "slug" | "market_value"
> & {
  player_positions: DbPlayerPosition[];
  player_careers: DbPlayerCareer[];
  player_national_teams: DbPlayerNationalTeam[];
};

// Player Detail

export type DbPlayerDetailCareer = Pick<
  Tables<"player_careers">,
  "id" | "joined_at" | "left_at" | "club_id"
> & {
  club: ClubSummary;
  player_contracts: ContractSummary[];
  player_shirt_numbers: ShirtNumberSummary[];
};

export type DbPlayerDetailRow = Player & {
  player_positions: DbPlayerPosition[];
  player_careers: DbPlayerDetailCareer[];
  player_national_teams: DbPlayerNationalTeam[];
};

// API Response DTO

// Player List

export interface PlayerShirtNumber {
  club: number | null;
  nationalTeam: number | null;
}

export interface PlayerListItem {
  id: string;
  imageUrl: string;
  name: string;
  slug: string;

  shirtNumber: PlayerShirtNumber;

  mainPosition: PositionSummary;
  currentClub: ClubSummary | null;
  currentNationality: NationalitySummary | null;

  marketValue: number;
}

// Player Detail

export interface PlayerNationalTeam {
  id: string;
  label: string;
  startDate: string;
  endDate: string | null;
  shirtNumber: number;
  nationality: NationalitySummary;
}

// Model For Edit

export interface PlayerPosition {
  positionId: string;
  displayOrder: number;
}

export interface PlayerEditResponse {
  id: string;
  name: string;
  image: string | null;

  dob: string;
  pob: string;

  height: number;
  weight: number;

  preferredFoot: string;
  marketValue: number;

  positions: PlayerPosition[];

  nationalTeams: PlayerNationalTeam[];
}

// Model View Detail

export interface PlayerCareer {
  id: string;
  joinedAt: string;
  leftAt: string | null;
  club: ClubSummary;
  shirtNumber: ShirtNumberSummary;
}

export interface PlayerDetailResponse {
  id: string;
  image: string | null;
  name: string;
  slug: string;

  summary: {
    shirtNumber: PlayerShirtNumber;
    imageUrl: string | null;
    name: string;

    dob: string;
    pob: string;
    currentNationality: NationalitySummary | null;
    height: string;
    mainPosition: PositionSummary;

    currentClub: ClubSummary | null;
    joinedAt: string | null;
    contractEnd: string | null;
  };

  profile: {
    name: string;
    dob: string;
    pob: string;
    height: string;
    weight: string;
    preferredFoot: string;
    marketValue: string;

    mainPosition: PositionSummary;
    otherPositions: PositionSummary[];

    nationalities: NationalitySummary[];

    currentClub: ClubSummary | null;
    joinedAt: string | null;
    contractEnd: string | null;
  };

  history: {
    careers: PlayerCareer[];
    nationalTeams: PlayerNationalTeam[];
  };
}

export interface PlayerLookupResponse {
  id: string;
  slug: string;
}

// Mutation
export type UpsertPlayerInput = z.infer<typeof playerMutationSchema> & {
  id?: string;
} & ImagePayload;

// Others

export type PlayerStatus = "active" | "inactive";
