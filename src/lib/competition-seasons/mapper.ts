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
    status,
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
    status,

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
    status,
    winner_club_team_id,
    winner_national_team_id,
  } = competitionSeason;

  return {
    id,
    name,
    seasonLabel: season_label,
    startDate: start_date,
    endDate: end_date,
    status,
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
    status,
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
    status,

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
    name,
  };
}
