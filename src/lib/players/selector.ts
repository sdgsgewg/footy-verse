import { ClubTeamResponse } from "@/types/club-team";
import {
  DbPlayerDetailRow,
  DbPlayerListRow,
  ShirtNumberResponse,
} from "@/types/player";
import { PlayerCareerQuery } from "@/types/player-career";
import { mapClubTeamResponse } from "../club-teams/mapper";
import { PlayerPositionQuery } from "@/types/player-position";
import { PositionSummary } from "@/types/position";
import { PlayerNationalityQuery } from "@/types/player-nationality";
import { NationalityResponse } from "@/types/nationality";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { mapNationalTeam } from "../national-teams/mapper";
import { NationalTeamResponse } from "@/types/national-team";
import { PlayerClubCareerQuery } from "@/types/player-club-career";
import { PlayerNationalTeamCareerQuery } from "@/types/player-national-team-career";
import { PlayerContractSummary } from "@/types/player-contract";

export function getCurrentCareer(
  careers: PlayerCareerQuery[],
  currentClubCareer: PlayerClubCareerQuery,
) {
  const current = careers.find(
    (c) => c.player_club_career?.id === currentClubCareer.id,
  );

  if (!current) return undefined;

  return current;
}

export function getCurrentClubCareer(
  player: DbPlayerListRow | DbPlayerDetailRow,
): PlayerClubCareerQuery | undefined {
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

  if (current && current.player_club_career) return current.player_club_career;

  // 4. If no active career, find the latest one
  const latest = clubCareers.toSorted(
    (a, b) => new Date(b.left_at!).getTime() - new Date(a.left_at!).getTime(),
  )[0];

  if (!latest || !latest.player_club_career) return undefined;

  return latest.player_club_career;
}

export function getCurrentNationalTeamCareer(
  player: DbPlayerListRow | DbPlayerDetailRow,
): PlayerNationalTeamCareerQuery | undefined {
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
 * @param currentClubCareer
 * @returns number
 */
function getCurrentClubShirtNumber(
  careers: PlayerCareerQuery[],
  currentClubCareer: PlayerClubCareerQuery,
): number | undefined {
  const currentCareer = careers.find(
    (c) => c.player_club_career?.id === currentClubCareer.id,
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
 * @param currentNationalTeamCareer
 * @returns number
 */
function getCurrentNationalTeamShirtNumber(
  careers: PlayerCareerQuery[],
  currentNationalTeamCareer: PlayerNationalTeamCareerQuery,
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
  const currentClubCareer = getCurrentClubCareer(player);

  const currentNationalTeamCareer = getCurrentNationalTeamCareer(player);

  const careers = player.player_careers;

  const currentClubShirtNumber = currentClubCareer
    ? getCurrentClubShirtNumber(careers, currentClubCareer)
    : null;

  const currentNationalTeamShirtNumber = currentNationalTeamCareer
    ? getCurrentNationalTeamShirtNumber(careers, currentNationalTeamCareer)
    : null;

  const data: ShirtNumberResponse = {
    club: currentClubShirtNumber ?? null,
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
    return mapNationalTeam(current.player_national_team_career.national_team);

  // 4. If no active career, find the latest one
  const latest = nationalTeamCareers.toSorted(
    (a, b) => new Date(b.left_at!).getTime() - new Date(a.left_at!).getTime(),
  )[0];

  if (!latest || !latest.player_national_team_career) return undefined;

  return mapNationalTeam(latest.player_national_team_career.national_team);
}

/**
 *
 * @param playerPositions
 * @returns PositionSummary
 */
export function getMainPosition(
  playerPositions: PlayerPositionQuery[],
): PositionSummary {
  const playerPosition = playerPositions.find((p) => p.display_order === 1);

  if (!playerPosition) {
    throw new Error("Player must have a main position.");
  }

  return playerPosition.position;
}

/**
 *
 * @param playerPositions
 * @returns PositionSummary[]
 */
export function getOtherPositions(
  playerPositions: PlayerPositionQuery[],
): PositionSummary[] {
  return playerPositions
    .filter((pos) => pos.display_order !== 1)
    .sort((a, b) => a.display_order - b.display_order)
    .map((pp) => ({
      id: pp.position.id,
      name: pp.position.name,
    }));
}

/**
 *
 * @param playerNationalities
 * @returns NationalityResponse[]
 */
export function getNationalities(
  playerNationalities: PlayerNationalityQuery[],
): NationalityResponse[] {
  return playerNationalities.map((pn) => {
    const { nationality } = pn;
    return {
      id: nationality.id,
      imageUrl: getImageUrl(
        "nationality",
        STORAGE_BUCKETS.NATIONALITIES,
        nationality.image,
      ),
      name: nationality.name,
    };
  });
}

/**
 *
 * @param playerNationalities
 * @returns NationalityResponse
 */
export function getCurrentNationality(
  playerNationalities: PlayerNationalityQuery[],
): NationalityResponse {
  const playerNationality = playerNationalities.find(
    (n) => n.display_order === 1,
  );

  if (!playerNationality) {
    throw new Error("Player must have a main nationality.");
  }

  const { id, image, name } = playerNationality.nationality;

  const data: NationalityResponse = {
    id,
    imageUrl: getImageUrl("nationality", STORAGE_BUCKETS.NATIONALITIES, image),
    name,
  };

  return data;
}

/**
 *
 * @param playerContracts
 * @returns PlayerContractSummary | null
 */
export function getCurrentContract(
  playerContracts: PlayerContractSummary[],
): PlayerContractSummary | null {
  if (!playerContracts || playerContracts.length === 0) return null;

  return playerContracts.sort(
    (a, b) =>
      new Date(b.contract_end ?? b.contract_start).getTime() -
      new Date(a.contract_end ?? a.contract_start).getTime(),
  )[0];
}
