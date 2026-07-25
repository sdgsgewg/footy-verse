import {
  ClubTeamResponse,
  DbPlayerCareer,
  DbPlayerDetailCareer,
  DbPlayerDetailRow,
  DbPlayerListRow,
  DbPlayerNationality,
  DbPlayerNationalTeam,
  DbPlayerPosition,
  NationalityResponse,
  PlayerNationalTeamResponse,
  PositionSummary,
  ShirtNumberResponse,
} from "@/types/player";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { formatClubName } from "../club-teams/formatter";
import { formatNationalTeamName } from "../national-teams/formatter";

/**
 *
 * @param playerPositions
 * @returns PositionSummary
 */
export function getMainPosition(
  playerPositions: DbPlayerPosition[],
): PositionSummary {
  const playerPosition = playerPositions.find((p) => p.display_order === 1);

  if (!playerPosition) {
    throw new Error("Player must have a main position.");
  }

  return playerPosition.position;
}

/**
 *
 * @param playerNationalities
 * @returns NationalityResponse
 */
export function getCurrentNationality(
  playerNationalities: DbPlayerNationality[],
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
 * @param player
 * @returns ClubTeamResponse | undefined
 */
export function getCurrentClubTeam(
  player: DbPlayerListRow | DbPlayerDetailRow,
): ClubTeamResponse | undefined {
  if (!player.player_careers || player.player_careers.length === 0)
    return undefined;

  const current = player.player_careers.find(
    (career) => career.left_at === null,
  );

  if (current) {
    const { id, squad_type, age_group, club } = current.club_team;

    return {
      id,
      imageUrl: getImageUrl("club", STORAGE_BUCKETS.CLUBS, club.image),
      name: formatClubName(current.club_team),
      squadType: squad_type,
      ageGroup: age_group,
    };
  }

  const prev = [...player.player_careers].sort(
    (a, b) =>
      new Date(b.left_at ?? b.joined_at).getTime() -
      new Date(a.left_at ?? a.joined_at).getTime(),
  )[0]?.club_team;

  const { id, squad_type, age_group, club } = prev;

  return {
    id,
    imageUrl: getImageUrl("club", STORAGE_BUCKETS.CLUBS, club.image),
    name: formatClubName(prev),
    squadType: squad_type,
    ageGroup: age_group,
  };
}

// ========================== Current Shirt Number Section ================================

/**
 *
 * @param player
 * @returns DbPlayerCareer
 */
function getCurrentCareer(player: DbPlayerListRow): DbPlayerCareer {
  const current = player.player_careers.find(
    (career) => career.left_at == null,
  );

  if (current) return current;

  return [...player.player_careers].sort(
    (a, b) =>
      new Date(b.left_at ?? b.joined_at).getTime() -
      new Date(a.left_at ?? a.joined_at).getTime(),
  )[0];
}

/**
 *
 * @param pnt
 * @returns PlayerNationalTeamResponse
 */
function mapPlayerNationalTeam(
  pnt: DbPlayerNationalTeam,
): PlayerNationalTeamResponse {
  const { id, shirt_number, start_date, end_date, national_team } = pnt;

  return {
    id,
    shirtNumber: shirt_number,
    startDate: start_date,
    endDate: end_date,
    nationalTeam: {
      id: national_team.id,
      imageUrl: getImageUrl(
        "nationality",
        STORAGE_BUCKETS.NATIONALITIES,
        national_team.nation.image,
      ),
      name: formatNationalTeamName(national_team),
      teamCategory: national_team.team_category,
      ageGroup: national_team.age_group,
    },
  };
}

/**
 *
 * @param player
 * @returns PlayerNationalTeamResponse | undefined
 */
function getCurrentNationalTeam(
  player: DbPlayerListRow | DbPlayerDetailRow,
): PlayerNationalTeamResponse | undefined {
  if (
    !player.player_national_teams ||
    player.player_national_teams.length === 0
  )
    return undefined;

  const current = player.player_national_teams.find((c) => c.end_date === null);

  if (current) {
    return mapPlayerNationalTeam(current);
  }

  const prev = [...player.player_national_teams].sort(
    (a, b) =>
      new Date(b.end_date ?? b.start_date).getTime() -
      new Date(a.end_date ?? a.start_date).getTime(),
  )[0];

  return mapPlayerNationalTeam(prev);
}

/**
 *
 * @param currentCareer
 * @returns number
 */
function getCurrentClubShirtNumber(
  currentCareer: DbPlayerCareer | DbPlayerDetailCareer,
): number {
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
  const currentCareer =
    player.player_careers && player.player_careers.length > 0
      ? getCurrentCareer(player)
      : undefined;

  const currentNationalTeam =
    player.player_national_teams && player.player_national_teams.length > 0
      ? getCurrentNationalTeam(player)
      : undefined;

  const currentClubShirtNumber = currentCareer
    ? getCurrentClubShirtNumber(currentCareer)
    : null;

  const data: ShirtNumberResponse = {
    club: currentClubShirtNumber,
    nationalTeam: currentNationalTeam ? currentNationalTeam.shirtNumber : null,
  };

  return data;
}
