import {
  ClubSummary,
  DbPlayerCareer,
  DbPlayerDetailCareer,
  DbPlayerDetailRow,
  DbPlayerListRow,
  DbPlayerNationalTeam,
  DbPlayerPosition,
  NationalitySummary,
  PlayerShirtNumber,
  PositionSummary,
} from "@/types/player";

/**
 *
 * @param positions
 * @returns DbPlayerPosition
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
 * @param player
 * @returns DbPlayerCareer
 */
export function getCurrentCareer(player: DbPlayerListRow): DbPlayerCareer {
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
 * @param player
 * @returns DbPlayerNationalTeam
 */
export function getCurrentNationalTeam(
  player: DbPlayerListRow,
): DbPlayerNationalTeam {
  const current = player.player_national_teams.find((c) => c.end_date === null);

  if (current) return current;

  return [...player.player_national_teams].sort(
    (a, b) =>
      new Date(b.end_date ?? b.start_date).getTime() -
      new Date(a.end_date ?? a.start_date).getTime(),
  )[0];
}

/**
 *
 * @param player
 * @returns ClubSummary
 */
export function getCurrentClub(
  player: DbPlayerListRow | DbPlayerDetailRow,
): ClubSummary | undefined {
  if (!player.player_careers) return undefined;

  const current = player.player_careers.find(
    (career) => career.left_at === null,
  );

  if (current) {
    return current.club;
  }

  return [...player.player_careers].sort(
    (a, b) =>
      new Date(b.left_at ?? b.joined_at).getTime() -
      new Date(a.left_at ?? a.joined_at).getTime(),
  )[0]?.club;
}

/**
 *
 * @param player
 * @returns NationalitySummary
 */
export function getCurrentNationality(
  player: DbPlayerListRow | DbPlayerDetailRow,
): NationalitySummary | undefined {
  if (!player.player_national_teams) return undefined;

  const current = player.player_national_teams.find((c) => c.end_date === null);

  if (current) {
    return current.nationality;
  }

  return [...player.player_national_teams].sort(
    (a, b) =>
      new Date(b.end_date ?? b.start_date).getTime() -
      new Date(a.end_date ?? a.start_date).getTime(),
  )[0]?.nationality;
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
 * @returns PlayerSquadNumber
 */
export function getCurrentShirtNumber(
  player: DbPlayerListRow | DbPlayerDetailRow,
): PlayerShirtNumber {
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

  const data: PlayerShirtNumber = {
    club: currentClubShirtNumber,
    nationalTeam: currentNationalTeam ? currentNationalTeam.shirt_number : null,
  };

  return data;
}
