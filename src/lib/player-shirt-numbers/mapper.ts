import {
  DbPlayerClubTeamShirtNumberListRow,
  DbPlayerNationalTeamShirtNumberListRow,
  DbPlayerShirtNumberDetailRow,
  PlayerClubTeamShirtNumberListItem,
  PlayerNationalTeamShirtNumberListItem,
  PlayerShirtNumberDetailResponse,
  PlayerShirtNumberEditResponse,
} from "@/types/player-shirt-number";
import { mapClubTeamResponse } from "../club-teams/mapper";
import { mapNationalTeamResponse } from "../national-teams/mapper";

export function mapPlayerClubTeamShirtNumberListItem(
  playerShirtNumber: DbPlayerClubTeamShirtNumberListRow,
): PlayerClubTeamShirtNumberListItem {
  const { id, shirt_number, start_date, end_date, player_career } =
    playerShirtNumber;

  return {
    id,
    clubTeam: mapClubTeamResponse(
      player_career.player_club_team_career.club_team,
    ),
    shirtNumber: shirt_number,
    startDate: start_date,
    endDate: end_date,
  };
}
export function mapPlayerNationalTeamShirtNumberListItem(
  playerShirtNumber: DbPlayerNationalTeamShirtNumberListRow,
): PlayerNationalTeamShirtNumberListItem {
  const { id, shirt_number, start_date, end_date, player_career } =
    playerShirtNumber;

  return {
    id,
    nationalTeam: mapNationalTeamResponse(
      player_career.player_national_team_career.national_team,
    ),
    shirtNumber: shirt_number,
    startDate: start_date,
    endDate: end_date,
  };
}

export function mapPlayerShirtNumberEditResponse(
  playerShirtNumber: DbPlayerShirtNumberDetailRow,
): PlayerShirtNumberEditResponse {
  const { shirt_number, start_date, end_date } = playerShirtNumber;

  return {
    shirtNumber: shirt_number,
    startDate: start_date,
    endDate: end_date,
  };
}

export function mapPlayerShirtNumberDetailResponse(
  playerShirtNumber: DbPlayerShirtNumberDetailRow,
): PlayerShirtNumberDetailResponse {
  const { id, shirt_number, start_date, end_date } = playerShirtNumber;

  return {
    id,
    shirtNumber: shirt_number,
    startDate: start_date,
    endDate: end_date,
  };
}
