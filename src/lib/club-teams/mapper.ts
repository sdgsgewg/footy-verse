import {
  ClubTeamDetailResponse,
  ClubTeamEditResponse,
  ClubTeamListItem,
  DbClubTeamDetailRow,
  DbClubTeamListRow,
} from "@/types/club-team";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { formatClubName } from "./formatter";

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
  const { id, squad_type, age_group, club_id } = clubTeam;

  return {
    id,
    squadType: squad_type,
    ageGroup: age_group,
    clubId: club_id,
  };
}
