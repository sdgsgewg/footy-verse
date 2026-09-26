import {
  CompetitionSeasonDetailResponse,
  CompetitionSeasonEditResponse,
  CompetitionSeasonListItem,
  CompetitionSeasonResponse,
  DbCompetitionSeasonDetailRow,
  DbCompetitionSeasonListRow,
  DbCompetitionSeasonRow,
} from "@/types/competition-season";
import { mapNationalTeamToWinnerResponse } from "../national-teams/mapper";
import { mapClubTeamToWinnerResponse } from "../club-teams/mapper";
import { getCompetitionSeasonStatus } from "./selector";

/**
 *
 * @param competitionSeason
 * @returns
 */
export function mapCompetitionSeasonListItem(
  competitionSeason: DbCompetitionSeasonListRow,
): CompetitionSeasonListItem {
  const {
    id,
    name,
    season_label,
    slug,
    start_date,
    end_date,
    competition,
    winnerClubTeam,
    winnerNationalTeam,
  } = competitionSeason;

  const competitionName = name ?? competition.short_name ?? competition.name;

  const winner = winnerClubTeam
    ? mapClubTeamToWinnerResponse(winnerClubTeam)
    : winnerNationalTeam
      ? mapNationalTeamToWinnerResponse(winnerNationalTeam)
      : null;

  return {
    id,
    label: `${competitionName} ${season_label}`,
    slug,

    startDate: start_date,
    endDate: end_date,
    status: getCompetitionSeasonStatus(start_date, end_date),

    winner,
  };
}

export function mapCompetitionSeasonEditResponse(
  competitionSeason: DbCompetitionSeasonDetailRow,
): CompetitionSeasonEditResponse {
  const {
    id,
    name,
    season_label,
    start_date,
    end_date,
    winner_club_team_id,
    winner_national_team_id,
  } = competitionSeason;

  return {
    id,
    name,
    seasonLabel: season_label,
    startDate: start_date,
    endDate: end_date,
    winnerClubTeamId: winner_club_team_id,
    winnerNationalTeamId: winner_national_team_id,
  };
}

export function mapCompetitionSeasonDetailResponse(
  competitionSeason: DbCompetitionSeasonDetailRow,
): CompetitionSeasonDetailResponse {
  const {
    id,
    name,
    season_label,
    slug,
    start_date,
    end_date,
    winnerClubTeam,
    winnerNationalTeam,
  } = competitionSeason;

  const winner = winnerClubTeam
    ? mapClubTeamToWinnerResponse(winnerClubTeam)
    : winnerNationalTeam
      ? mapNationalTeamToWinnerResponse(winnerNationalTeam)
      : null;

  return {
    id,
    name,
    seasonLabel: season_label,
    slug,

    startDate: start_date,
    endDate: end_date,
    status: getCompetitionSeasonStatus(start_date, end_date),

    winner,
  };
}

// Helpers

export function mapCompetitionSeasonResponse(
  competitionSeason: DbCompetitionSeasonRow,
): CompetitionSeasonResponse {
  const { id, name } = competitionSeason;

  return {
    id,
    name: name ?? "",
  };
}
