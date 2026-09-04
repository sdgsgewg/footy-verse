import { GroupedPlayerListItem } from "@/types/player/responses";
import {
  SquadDepthPosition,
  SquadDepthResponse,
} from "@/types/teams/squad-depth";

export function getSquadDepth(
  groupedPlayers: GroupedPlayerListItem[],
): SquadDepthResponse {
  return groupedPlayers
    .map((group) => {
      const positionMap = new Map<string, SquadDepthPosition>();

      for (const player of group.players) {
        const position = player.mainPosition;

        const existing = positionMap.get(position.id);

        if (existing) {
          existing.players.push(player);
        } else {
          positionMap.set(position.id, {
            position,
            players: [player],
          });
        }
      }

      return {
        category: group.category,
        positions: Array.from(positionMap.values())
          .map((positionGroup) => ({
            ...positionGroup,

            players: [...positionGroup.players].sort((a, b) =>
              b.marketValue - a.marketValue,
            ),
          }))
          .sort((a, b) => a.position.displayOrder - b.position.displayOrder),
      };
    })
    .sort((a, b) => a.category.displayOrder - b.category.displayOrder);
}
