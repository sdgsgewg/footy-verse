import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { formatNationalTeamName } from "../national-teams/formatter";
import {
  DbPlayerNationalTeamCareerDetailRow,
  DbPlayerNationalTeamCareerListRow,
  PlayerNationalTeamCareerDetailResponse,
  PlayerNationalTeamCareerEditResponse,
  PlayerNationalTeamCareerListItem,
} from "@/types/player-national-team-career";
import {
  mapPlayerCareerDetailResponse,
  mapPlayerCareerEditResponse,
} from "../player-careers/mapper";
import {
  mapPlayerShirtNumberDetailResponse,
  mapPlayerShirtNumberEditResponse,
} from "../player-shirt-numbers/mapper";
import { mapNationalTeamResponse } from "../national-teams/mapper";

/**
 *
 * @param playerNationalTeamCareer
 * @returns PlayerNationalTeamCareerListItem
 */
export function mapPlayerNationalTeamCareerListItem(
  playerNationalTeamCareer: DbPlayerNationalTeamCareerListRow,
): PlayerNationalTeamCareerListItem {
  const { id, national_team, player_career } = playerNationalTeamCareer;

  const { joined_at, left_at } = player_career;

  return {
    id,
    imageUrl: getImageUrl(
      "nationality",
      STORAGE_BUCKETS.NATIONALITIES,
      national_team.nation.image,
    ),
    name: formatNationalTeamName(national_team),
    joinedAt: joined_at,
    leftAt: left_at,
  };
}

/**
 *
 * @param playerNationalTeamCareer
 * @returns PlayerNationalTeamCareerEditResponse
 */
export function mapPlayerNationalTeamCareerEditResponse(
  playerNationalTeamCareer: DbPlayerNationalTeamCareerDetailRow,
): PlayerNationalTeamCareerEditResponse {
  const { id, national_team_id, player_career_id, player_career } =
    playerNationalTeamCareer;

  const { player_shirt_numbers } = player_career;

  const career = mapPlayerCareerEditResponse(player_career);

  const shirtNumbers = player_shirt_numbers.map((psn) =>
    mapPlayerShirtNumberEditResponse(psn),
  );

  return {
    id,
    nationalTeamId: national_team_id,
    playerCareerId: player_career_id,

    career,
    shirtNumbers,
  };
}

export function mapPlayerNationalTeamCareerDetailResponse(
  playerNationalTeamCareer: DbPlayerNationalTeamCareerDetailRow,
): PlayerNationalTeamCareerDetailResponse {
  const { id, national_team, player_career } = playerNationalTeamCareer;

  const { player_shirt_numbers } = player_career;

  const nationalTeam = mapNationalTeamResponse(national_team);

  const career = mapPlayerCareerDetailResponse(player_career);

  const shirtNumbers = player_shirt_numbers.map((psn) =>
    mapPlayerShirtNumberDetailResponse(psn),
  );

  return {
    id,

    nationalTeam,
    career,
    shirtNumbers,
  };
}
