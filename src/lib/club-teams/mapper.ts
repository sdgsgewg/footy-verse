import {
  ClubTeamDetailResponse,
  ClubTeamEditResponse,
  ClubTeamListItem,
  ClubTeamResponse,
  DbClubTeamDetailRow,
  DbClubTeamListRow,
  DbClubTeamRow,
} from "@/types/club-team";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { formatClubName } from "./formatter";
import { mapClubResponse } from "../clubs/mapper";
import { formatEuroValue } from "../formatters/currency";
import { CompetitionSeasonWinnerResponse } from "@/types/competition-season";

export function mapClubTeamListItem(
  clubTeam: DbClubTeamListRow,
): ClubTeamListItem {
  const { id, squad_type, age_group, club } = clubTeam;

  return {
    id,
    imageUrl: getImageUrl("club", STORAGE_BUCKETS.CLUBS, club.image),
    name: formatClubName(clubTeam),
    squadType: squad_type,
    ageGroup: age_group,
  };
}

export function mapClubTeamEditResponse(
  clubTeam: DbClubTeamDetailRow,
): ClubTeamEditResponse {
  const { id, squad_type, age_group, club_id } = clubTeam;

  return {
    id,
    squadType: squad_type,
    ageGroup: age_group,
    clubId: club_id,
  };
}

export function mapClubTeamDetailResponse(
  clubTeam: DbClubTeamDetailRow,
): ClubTeamDetailResponse {
  const { id, squad_type, age_group, club, player_club_team_careers } =
    clubTeam;

  // Get players that still play here currently
  const filteredPlayerClubTeamCareers = player_club_team_careers.filter(
    (pctc) => pctc.player_career.left_at === null,
  );

  const squadSize = filteredPlayerClubTeamCareers.length;

  const marketValues = filteredPlayerClubTeamCareers.map(
    (pcc) => pcc.player_career.player.market_value,
  );

  const totalMarketValue = marketValues.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return {
    id,
    name: formatClubName(clubTeam),
    squadType: squad_type,
    ageGroup: age_group ?? null,

    club: mapClubResponse(club),

    squadSize: String(squadSize),
    totalMarketValue: formatEuroValue(totalMarketValue),
  };
}

// Helpers

export function mapClubTeamResponse(clubTeam: DbClubTeamRow): ClubTeamResponse {
  const { id, squad_type, age_group, club } = clubTeam;

  return {
    id,
    imageUrl: getImageUrl("club", STORAGE_BUCKETS.CLUBS, club.image),
    name: formatClubName(clubTeam),
    squadType: squad_type,
    ageGroup: age_group,
  };
}

/**
 *
 * @param clubTeam
 * @returns
 */
export function mapClubTeamToWinnerResponse(
  clubTeam: DbClubTeamRow,
): CompetitionSeasonWinnerResponse {
  const { id, club } = clubTeam;

  return {
    id,
    imageUrl: getImageUrl("club", STORAGE_BUCKETS.CLUBS, club.image),
    name: formatClubName(clubTeam),
  };
}
