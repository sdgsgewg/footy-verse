import { TransferType } from "@/enums/TransferType";
import { ClubTeamResponse } from "@/types/club-team";
import {
  DbPlayerCareerRow,
  DbPlayerClubCareerRow,
  DbPlayerDetailRow,
  DbPlayerListRow,
  DbPlayerNationalTeamCareerRow,
  ShirtNumberResponse,
} from "@/types/player";
import { mapClubTeamResponse } from "../club-teams/mapper";
import { NationalTeamResponse } from "@/types/national-team";
import { mapNationalTeamResponse } from "../national-teams/mapper";
import { DbPlayerPositionRow } from "@/types/player-position";
import { PositionResponse } from "@/types/position";
import { mapPositionResponse } from "../positions/mapper";
import { DbPlayerNationalityRow } from "@/types/player-nationality";
import { NationalityResponse } from "@/types/nationality";
import { mapNationalityResponse } from "../nationalities/mapper";
import { PlayerContractSummary } from "@/types/player-contract";

/**
 *
 * @param player
 * @returns DbPlayerCareerRow | undefined
 */
export function getCurrentClubTeamRecentPlayerCareer(
  player: DbPlayerListRow | DbPlayerDetailRow,
): DbPlayerCareerRow | undefined {
  // 1. If no player careers then return undefined
  if (player.player_careers.length === 0) return undefined;

  // 2. Check whether player careers have player club career, then sort from latest to oldest
  const clubCareers = player.player_careers
    .filter((career) => career.player_club_career !== null)
    .toSorted(
      (a, b) =>
        new Date(b.left_at ?? b.joined_at).getDate() -
        new Date(a.left_at ?? a.joined_at).getDate(),
    );

  if (clubCareers.length === 0) {
    return undefined;
  }

  // 3. Find the active club career
  const currentPlayerCareer = clubCareers.find(
    (career) => career.left_at === null,
  );

  if (!currentPlayerCareer || !currentPlayerCareer.player_club_career)
    return undefined;

  const initialPlayerCareer = player.player_careers.find(
    (c) =>
      c.player_club_career?.club_team_id ===
        currentPlayerCareer.player_club_career?.club_team_id &&
      c.player_club_career?.player_transfer.transfer_type !=
        TransferType.LOAN_RETURN,
  );

  if (!initialPlayerCareer) return undefined;

  // 4. Check if the most recent transfer is a loan return
  const recentPlayerCareer =
    currentPlayerCareer.player_club_career.player_transfer.transfer_type ===
    TransferType.LOAN_RETURN
      ? initialPlayerCareer
      : currentPlayerCareer;

  return recentPlayerCareer;
}

/**
 *
 * @param player
 * @returns string | undefined
 */
export function getJoinedAtDate(
  player: DbPlayerListRow | DbPlayerDetailRow,
): string | undefined {
  const recentPlayerCareer = getCurrentClubTeamRecentPlayerCareer(player);

  if (!recentPlayerCareer) return undefined;

  return recentPlayerCareer.joined_at;
}

/**
 *
 * @param player
 * @returns PlayerContractSummary | undefined
 */
export function getCurrentContract(
  player: DbPlayerListRow | DbPlayerDetailRow,
): PlayerContractSummary | undefined {
  const recentPlayerCareer = getCurrentClubTeamRecentPlayerCareer(player);

  if (!recentPlayerCareer) return undefined;

  const clubTeamContracts =
    recentPlayerCareer.player_club_career?.player_contracts;

  if (!clubTeamContracts || clubTeamContracts.length === 0) {
    return undefined;
  }

  const currentClubTeamContract = clubTeamContracts.toSorted(
    (a, b) =>
      new Date(b.contract_end ?? b.contract_start).getTime() -
      new Date(a.contract_end ?? a.contract_start).getTime(),
  )[0];

  return currentClubTeamContract;
}

/**
 *
 * @param player
 * @returns
 */
export function getCurrentClubTeamCareer(
  player: DbPlayerListRow | DbPlayerDetailRow,
): DbPlayerClubCareerRow | undefined {
  const recentPlayerCareer = getCurrentClubTeamRecentPlayerCareer(player);

  if (!recentPlayerCareer || !recentPlayerCareer.player_club_career)
    return undefined;

  return recentPlayerCareer.player_club_career;
}

/**
 *
 * @param careers
 * @param currentClubTeamCareer
 * @returns
 */
export function getCurrentClubTeamShirtNumber(
  careers: DbPlayerCareerRow[],
  currentClubTeamCareer: DbPlayerClubCareerRow,
): number | undefined {
  const currentCareer = careers.find(
    (c) => c.player_club_career?.id === currentClubTeamCareer.id,
  );

  if (!currentCareer) return undefined;

  const current = currentCareer.player_shirt_numbers.find(
    (psn) => psn.end_date === null,
  );

  if (current) {
    return current.shirt_number;
  }

  return [...currentCareer.player_shirt_numbers].sort(
    (a, b) =>
      new Date(b.end_date ?? b.start_date).getTime() -
      new Date(a.end_date ?? a.start_date).getTime(),
  )[0].shirt_number;
}

/**
 *
 * @param player
 * @returns
 */
export function getCurrentNationalTeamCareer(
  player: DbPlayerListRow | DbPlayerDetailRow,
): DbPlayerNationalTeamCareerRow | undefined {
  // 1. If no player careers then return undefined
  if (player.player_careers.length === 0) return undefined;

  // 2. Check whether player careers have player national team career
  const nationalTeamCareers = player.player_careers.filter(
    (career) => career.player_national_team_career !== null,
  );

  if (nationalTeamCareers.length === 0) {
    return undefined;
  }

  // 3. Find the active club career
  const current = nationalTeamCareers.find((career) => career.left_at === null);

  if (current && current.player_national_team_career)
    return current.player_national_team_career;

  // 4. If no active career, find the latest one
  const latest = nationalTeamCareers.toSorted(
    (a, b) => new Date(b.left_at!).getTime() - new Date(a.left_at!).getTime(),
  )[0];

  if (!latest || !latest.player_national_team_career) return undefined;

  return latest.player_national_team_career;
}

/**
 *
 * @param currentNationalTeamCareer
 * @returns number
 */
function getCurrentNationalTeamShirtNumber(
  careers: DbPlayerCareerRow[],
  currentNationalTeamCareer: DbPlayerNationalTeamCareerRow,
): number | undefined {
  const currentCareer = careers.find(
    (c) => c.player_national_team_career?.id === currentNationalTeamCareer.id,
  );

  if (!currentCareer) return undefined;

  const current = currentCareer.player_shirt_numbers.find(
    (psn) => psn.end_date === null,
  );

  if (current) {
    return current.shirt_number;
  }

  return [...currentCareer.player_shirt_numbers].sort(
    (a, b) =>
      new Date(b.end_date ?? b.start_date).getTime() -
      new Date(a.end_date ?? a.start_date).getTime(),
  )[0].shirt_number;
}

/**
 *
 * @param player
 * @returns ShirtNumberResponse
 */
export function getCurrentShirtNumber(
  player: DbPlayerListRow | DbPlayerDetailRow,
): ShirtNumberResponse {
  // Club Team

  const currentClubTeamCareer = getCurrentClubTeamCareer(player);

  const currentClubTeamShirtNumber = currentClubTeamCareer
    ? getCurrentClubTeamShirtNumber(
        player.player_careers,
        currentClubTeamCareer,
      )
    : null;

  // National Team

  const currentNationalTeamCareer = getCurrentNationalTeamCareer(player);

  const careers = player.player_careers;

  const currentNationalTeamShirtNumber = currentNationalTeamCareer
    ? getCurrentNationalTeamShirtNumber(careers, currentNationalTeamCareer)
    : null;

  const data: ShirtNumberResponse = {
    clubTeam: currentClubTeamShirtNumber ?? null,
    nationalTeam: currentNationalTeamShirtNumber ?? null,
  };

  return data;
}

/**
 *
 * @param player
 * @returns ClubTeamResponse | undefined
 */
export function getCurrentClubTeam(
  player: DbPlayerListRow | DbPlayerDetailRow,
): ClubTeamResponse | undefined {
  // 1. If no player careers then return undefined
  if (player.player_careers.length === 0) return undefined;

  // 2. Check whether player careers have player club career
  const clubCareers = player.player_careers.filter(
    (career) => career.player_club_career !== null,
  );

  if (clubCareers.length === 0) {
    return undefined;
  }

  // 3. Find the active club career
  const current = clubCareers.find((career) => career.left_at === null);

  if (current && current.player_club_career)
    return mapClubTeamResponse(current.player_club_career.club_team);

  // 4. If no active career, find the latest one
  const latest = clubCareers.toSorted(
    (a, b) => new Date(b.left_at!).getTime() - new Date(a.left_at!).getTime(),
  )[0];

  if (!latest || !latest.player_club_career) return undefined;

  return mapClubTeamResponse(latest.player_club_career.club_team);
}

/**
 *
 * @param player
 * @returns NationalTeamResponse | undefined
 */
export function getCurrentNationalTeam(
  player: DbPlayerListRow | DbPlayerDetailRow,
): NationalTeamResponse | undefined {
  // 1. If no player careers then return undefined
  if (player.player_careers.length === 0) return undefined;

  // 2. Check whether player careers have player national team career
  const nationalTeamCareers = player.player_careers.filter(
    (career) => career.player_national_team_career !== null,
  );

  if (nationalTeamCareers.length === 0) {
    return undefined;
  }

  // 3. Find the active club career
  const current = nationalTeamCareers.find((career) => career.left_at === null);

  if (current && current.player_national_team_career)
    return mapNationalTeamResponse(
      current.player_national_team_career.national_team,
    );

  // 4. If no active career, find the latest one
  const latest = nationalTeamCareers.toSorted(
    (a, b) => new Date(b.left_at!).getTime() - new Date(a.left_at!).getTime(),
  )[0];

  if (!latest || !latest.player_national_team_career) return undefined;

  return mapNationalTeamResponse(
    latest.player_national_team_career.national_team,
  );
}

/**
 *
 * @param playerPositions
 * @returns PositionResponse
 */
export function getMainPosition(
  playerPositions: DbPlayerPositionRow[],
): PositionResponse {
  const playerPosition = playerPositions.find((p) => p.display_order === 1);

  if (!playerPosition) {
    throw new Error("Player must have a main position.");
  }

  const { position } = playerPosition;

  return mapPositionResponse(position);
}

/**
 *
 * @param playerPositions
 * @returns PositionResponse[]
 */
export function getOtherPositions(
  playerPositions: DbPlayerPositionRow[],
): PositionResponse[] {
  return playerPositions
    .filter((pos) => pos.display_order !== 1)
    .sort((a, b) => a.display_order - b.display_order)
    .map((pp) => mapPositionResponse(pp.position));
}

/**
 *
 * @param playerNationalities
 * @returns NationalityResponse[]
 */
export function getNationalities(
  playerNationalities: DbPlayerNationalityRow[],
): NationalityResponse[] {
  return playerNationalities.map((pn) => {
    const { nationality } = pn;

    return mapNationalityResponse(nationality);
  });
}

/**
 *
 * @param playerNationalities
 * @returns NationalityResponse
 */
export function getCurrentNationality(
  playerNationalities: DbPlayerNationalityRow[],
): NationalityResponse {
  const playerNationality = playerNationalities.find(
    (n) => n.display_order === 1,
  );

  if (!playerNationality) {
    throw new Error("Player must have a main nationality.");
  }

  const { nationality } = playerNationality;

  return mapNationalityResponse(nationality);
}
