import { GroupedPlayerListItem, PlayerListItem } from "@/types/player";

export function flattenGroupedPlayers(
  groupedPlayers: GroupedPlayerListItem[],
): PlayerListItem[] {
  return groupedPlayers.flatMap(({ players }) => players);
}
