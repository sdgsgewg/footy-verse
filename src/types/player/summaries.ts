// PositionSummary, ClubSummary, dll

import { Tables } from "@/lib/database.types";

export type PositionSummary = Pick<Tables<"positions">, "id" | "name">;

export type NationalitySummary = Pick<
  Tables<"nationalities">,
  "id" | "name" | "image"
>;

export type NationalTeamSummary = Pick<
  Tables<"national_teams">,
  "id" | "team_category" | "age_group"
> & {
  nation: NationalitySummary;
};

export type ClubSummary = Pick<Tables<"clubs">, "id" | "name" | "image">;

export type ClubTeamSummary = Pick<
  Tables<"club_teams">,
  "id" | "squad_type" | "age_group"
> & {
  club: ClubSummary;
};

export type PlayerContractSummary = Pick<
  Tables<"player_contracts">,
  "contract_start" | "contract_end"
>;

export type PlayerShirtNumberSummary = Pick<
  Tables<"player_shirt_numbers">,
  "start_date" | "end_date" | "shirt_number"
>;
