import {
  DbPlayerClubTeamCareerDetailRow,
  DbPlayerClubTeamCareerListRow,
  PlayerClubTeamCareerDetailResponse,
  PlayerClubTeamCareerEditResponse,
  PlayerClubTeamCareerListItem,
} from "@/types/player-club-team-career";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { formatClubName } from "../club-teams/formatter";
import {
  mapPlayerTransferDetailResponse,
  mapPlayerTransferEditResponse,
} from "../player-transfers/mapper";
import {
  mapPlayerCareerDetailResponse,
  mapPlayerCareerEditResponse,
} from "../player-careers/mapper";
import {
  mapPlayerContractDetailResponse,
  mapPlayerContractEditResponse,
} from "../player-contracts/mapper";
import {
  mapPlayerShirtNumberDetailResponse,
  mapPlayerShirtNumberEditResponse,
} from "../player-shirt-numbers/mapper";
import { mapClubTeamResponse } from "../club-teams/mapper";

/**
 *
 * @param playerClubTeamCareer
 * @returns PlayerClubTeamCareerListItem
 */
export function mapPlayerClubTeamCareerListItem(
  playerClubTeamCareer: DbPlayerClubTeamCareerListRow,
): PlayerClubTeamCareerListItem {
  const { id, club_team, player_career } = playerClubTeamCareer;

  const { joined_at, left_at } = player_career;

  return {
    id,
    imageUrl: getImageUrl("club", STORAGE_BUCKETS.CLUBS, club_team.club.image),
    name: formatClubName(club_team),
    joinedAt: joined_at,
    leftAt: left_at,
  };
}

/**
 *
 * @param playerClubTeamCareer
 * @returns PlayerClubTeamCareerEditResponse
 */
export function mapPlayerClubTeamCareerEditResponse(
  playerClubTeamCareer: DbPlayerClubTeamCareerDetailRow,
): PlayerClubTeamCareerEditResponse {
  const {
    id,
    club_team_id,
    player_career_id,
    player_career,
    player_contracts,
    player_transfer,
  } = playerClubTeamCareer;

  const { player_shirt_numbers } = player_career;

  const career = mapPlayerCareerEditResponse(player_career);

  const contracts = player_contracts.map((pc) =>
    mapPlayerContractEditResponse(pc),
  );

  const shirtNumbers = player_shirt_numbers.map((psn) =>
    mapPlayerShirtNumberEditResponse(psn),
  );

  const transfer = mapPlayerTransferEditResponse(player_transfer);

  return {
    id,
    clubTeamId: club_team_id,
    playerCareerId: player_career_id,

    career,
    contracts,
    shirtNumbers,
    transfer,
  };
}

/**
 *
 * @param playerClubTeamCareer
 * @returns PlayerClubTeamCareerDetailResponse
 */
export function mapPlayerClubTeamCareerDetailResponse(
  playerClubTeamCareer: DbPlayerClubTeamCareerDetailRow,
): PlayerClubTeamCareerDetailResponse {
  const {
    id,

    club_team,
    player_career,
    player_contracts,
    player_transfer,
  } = playerClubTeamCareer;

  const { player_shirt_numbers } = player_career;

  const clubTeam = mapClubTeamResponse(club_team);

  const career = mapPlayerCareerDetailResponse(player_career);

  const contracts = player_contracts.map((pc) =>
    mapPlayerContractDetailResponse(pc),
  );

  const shirtNumbers = player_shirt_numbers.map((psn) =>
    mapPlayerShirtNumberDetailResponse(psn),
  );

  const transfer = mapPlayerTransferDetailResponse(player_transfer);

  return {
    id,

    clubTeam,
    career,
    contracts,
    shirtNumbers,
    transfer,
  };
}
