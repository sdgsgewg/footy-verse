import { PreferredFoot } from "@/enums/PreferredFoot";
import { SelectOption } from "@/types/select";
import { getPreferredFootLabel } from "./labels";
import { PlayerListItem } from "@/types/player";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns
 */
export const getPreferredFootOptions = (t: Translate): SelectOption[] =>
  Object.values(PreferredFoot).map((prefFoot) => ({
    label: getPreferredFootLabel(prefFoot, t),
    value: prefFoot,
  }));

/**
 *
 * @param players
 * @returns
 */
export function getPlayerOptions(players: PlayerListItem[]): SelectOption[] {
  return players.map((player) => ({
    label: player.name,
    value: player.id,
    imageUrl: player.imageUrl,
  }));
}
