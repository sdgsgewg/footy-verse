import { DbClubRow } from "../club/query";
import { DbPlayerClubCareerWithPlayerCareerRow } from "../player-club-career";
import { ClubTeam } from "./database";

// Supabase Query Result

// Club Team List

export type DbClubTeamListRow = Pick<
  ClubTeam,
  "id" | "club_id" | "squad_type" | "age_group" | "created_at"
> & {
  club: DbClubRow;
};

// Club Team Detail

export type DbClubTeamDetailRow = ClubTeam & {
  club: DbClubRow;
  player_club_careers: DbPlayerClubCareerWithPlayerCareerRow[];
};

// Helpers

export type DbClubTeamRow = Pick<
  ClubTeam,
  "id" | "squad_type" | "age_group"
> & {
  club: DbClubRow;
};
