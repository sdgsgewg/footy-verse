import { PreferredFoot } from "@/enums/PreferredFoot";
import { Option } from "@/types/option";
import { getPreferredFootLabel } from "./labels";
import { PlayerListItem } from "@/types/player";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns
 */
export const getPreferredFootOptions = (t: Translate): Option[] =>
  Object.values(PreferredFoot).map((prefFoot) => ({
    label: getPreferredFootLabel(prefFoot, t),
    value: prefFoot,
  }));

/**
 *
 * @param players
 * @returns
 */
export function getPlayerOptions(players: PlayerListItem[]): Option[] {
  return players.map((player) => ({
    label: player.shortName,
    value: player.id,
    imageUrl: player.imageUrl,
  }));
}
