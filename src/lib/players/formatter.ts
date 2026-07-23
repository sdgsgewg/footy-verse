import {
  ClubTeam,
  DbPlayerCareer,
  DbPlayerDetailCareer,
  DbPlayerDetailRow,
  DbPlayerListRow,
  DbPlayerNationalTeam,
  DbPlayerPosition,
  NationalTeam,
  PlayerShirtNumber,
  PositionSummary,
} from "@/types/player";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { formatClubName } from "../club-teams/formatter";
import { formatNationalTeamName } from "../national-teams/formatter";

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
export function getCurrentPlayerNationalTeam(
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
 * @returns ClubTeamSummary | undefined
 */
export function getCurrentClubTeam(
  player: DbPlayerListRow | DbPlayerDetailRow,
): ClubTeam | undefined {
  if (!player.player_careers) return undefined;

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

/**
 *
 * @param player
 * @returns NationalTeam | undefined
 */
export function getCurrentNationalTeam(
  player: DbPlayerListRow | DbPlayerDetailRow,
): NationalTeam | undefined {
  if (!player.player_national_teams) return undefined;

  const current = player.player_national_teams.find((c) => c.end_date === null);

  if (current) {
    const { id, team_category, age_group, nation } = current.national_team;

    return {
      id,
      imageUrl: getImageUrl(
        "nationality",
        STORAGE_BUCKETS.NATIONALITIES,
        nation.image,
      ),
      name: formatNationalTeamName(current.national_team),
      teamCategory: team_category,
      ageGroup: age_group,
    };
  }

  const prev = [...player.player_national_teams].sort(
    (a, b) =>
      new Date(b.end_date ?? b.start_date).getTime() -
      new Date(a.end_date ?? a.start_date).getTime(),
  )[0]?.national_team;

  const { id, team_category, age_group, nation } = prev;

  return {
    id,
    imageUrl: getImageUrl(
      "nationality",
      STORAGE_BUCKETS.NATIONALITIES,
      nation.image,
    ),
    name: formatNationalTeamName(prev),
    teamCategory: team_category,
    ageGroup: age_group,
  };
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
      ? getCurrentPlayerNationalTeam(player)
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
