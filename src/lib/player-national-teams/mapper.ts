import {
  DbPlayerNationalTeamDetailRow,
  DbPlayerNationalTeamListRow,
  PlayerNationalTeamDetailResponse,
  PlayerNationalTeamEditResponse,
  PlayerNationalTeamListItem,
} from "@/types/player-national-teams";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { formatNationalTeamName } from "../national-teams/formatter";

export function mapPlayerNationalTeamListItem(
  playerNationalTeam: DbPlayerNationalTeamListRow,
): PlayerNationalTeamListItem {
  const { id, shirt_number, start_date, end_date, nationalTeam } =
    playerNationalTeam;

  return {
    id,
    imageUrl: getImageUrl(
      "nationality",
      STORAGE_BUCKETS.NATIONALITIES,
      nationalTeam.nation.image,
    ),
    name: formatNationalTeamName(nationalTeam),
    shirtNumber: shirt_number,
    startDate: start_date,
    endDate: end_date,
  };
}

export function mapPlayerNationalTeamEditResponse(
  playerNationalTeam: DbPlayerNationalTeamDetailRow,
): PlayerNationalTeamEditResponse {
  const { id, shirt_number, start_date, end_date, national_team_id } =
    playerNationalTeam;

  return {
    id,

    shirtNumber: shirt_number,
    startDate: start_date,
    endDate: end_date,
    nationalTeamId: national_team_id,
  };
}

export function mapPlayerNationalTeamDetailResponse(
  playerNationalTeam: DbPlayerNationalTeamDetailRow,
): PlayerNationalTeamDetailResponse {
  const { id, shirt_number, start_date, end_date, nationalTeam } =
    playerNationalTeam;

  return {
    id,
    shirtNumber: shirt_number,
    startDate: start_date,
    endDate: end_date,
    nationalTeamId: nationalTeam.id,
  };
}
