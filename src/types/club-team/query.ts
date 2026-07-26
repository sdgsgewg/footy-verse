import { ClubSummary } from "../club";
import { ClubTeam } from "./database";

// Supabase Query Result

// Club Team List

export type DbClubTeamListRow = Pick<
  ClubTeam,
  "id" | "squad_type" | "age_group"
> & {
  club: ClubSummary;
};

// Club Team Detail

export type DbClubTeamDetailRow = ClubTeam & {
  club: ClubSummary;
};
