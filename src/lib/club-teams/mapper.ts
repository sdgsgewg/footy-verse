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
  const { id, squad_type, age_group, club, player_club_careers } = clubTeam;

  const squadSize = player_club_careers.length;

  const marketValues = player_club_careers.map(
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
