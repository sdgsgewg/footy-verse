import {
  GroupedPlayerListItem,
  PlayerCreateInput,
  PlayerDuplicateCandidate,
  PlayerListItem,
} from "@/types/player";

export function flattenGroupedPlayers(
  groupedPlayers: GroupedPlayerListItem[],
): PlayerListItem[] {
  return groupedPlayers.flatMap(({ players }) => players);
}

function normalizeIds(ids: string[]): string[] {
  return [...new Set(ids)].sort();
}

function sameIds(first: string[], second: string[]): boolean {
  return (
    JSON.stringify(normalizeIds(first)) === JSON.stringify(normalizeIds(second))
  );
}

export function isDuplicatePlayer(
  player: PlayerCreateInput,
  existing: PlayerDuplicateCandidate,
): boolean {
  const playerPositionIds = player.positions.map(
    (position) => position.position_id,
  );

  const existingPositionIds = existing.player_positions.map(
    (position) => position.position_id,
  );

  const playerNationalityIds = player.nationalities.map(
    (nationality) => nationality.nation_id,
  );

  const existingNationalityIds = existing.player_nationalities.map(
    (nationality) => nationality.nation_id,
  );

  return (
    player.full_name === existing.full_name &&
    player.short_name === existing.short_name &&
    player.dob === existing.dob &&
    sameIds(playerPositionIds, existingPositionIds) &&
    sameIds(playerNationalityIds, existingNationalityIds)
  );
}
