import { DbClubTeamRow } from "../club-team";
import { DbNationalTeamRow } from "../national-team";
import { CompetitionSeason } from "./database";

// Supabase Query Result

// Competition Season List

export type DbCompetitionSeasonListRow = Pick<
  CompetitionSeason,
  "id" | "name" | "season_label" | "slug" | "status" | "start_date" | "end_date" | "competition_id"
> & {
  winnerClubTeam: DbClubTeamRow | null;
  winnerNationalTeam: DbNationalTeamRow | null;
};

// Competition Season Detail

export type DbCompetitionSeasonDetailRow = CompetitionSeason & {
  winnerClubTeam: DbClubTeamRow | null;
  winnerNationalTeam: DbNationalTeamRow | null;
};

// Helpers

export type DbCompetitionSeasonRow = Pick<CompetitionSeason, "id" | "name">;
