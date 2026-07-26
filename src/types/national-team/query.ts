import { NationalitySummary } from "../nationality";
import { NationalTeam } from "./database";

// Supabase Query Result

// National Team List

export type DbNationalTeamListRow = Pick<
  NationalTeam,
  "id" | "team_category" | "age_group"
> & {
  nation: NationalitySummary;
};

// National Team Detail

export type DbNationalTeamDetailRow = NationalTeam & {
  nation: NationalitySummary;
};
