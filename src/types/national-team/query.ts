import {
  DbNationalityWithConfederationRow,
  NationalitySummary,
} from "../nationality";
import { DbPlayerNationalTeamCareerWithPlayerCareerRow } from "../player-national-team-career";
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
  nation: DbNationalityWithConfederationRow;
  player_national_team_careers: DbPlayerNationalTeamCareerWithPlayerCareerRow[];
};

// Helpers

export type DbNationalTeamRow = Pick<
  NationalTeam,
  "id" | "team_category" | "age_group"
> & {
  nation: NationalitySummary;
};
