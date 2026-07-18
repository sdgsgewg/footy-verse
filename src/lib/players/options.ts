import { PreferredFoot } from "@/enums/PreferredFoot";
import { SelectOption } from "@/types/select";
import { getPreferredFootLabel } from "./labels";
import { PlayerListItem } from "@/types/player";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { getDefaultImage } from "../images/default-image";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns
 */

export const getPreferredFootOptions = (t: Translate): SelectOption[] =>
  Object.values(PreferredFoot).map((type) => ({
    label: getPreferredFootLabel(type, t),
    value: type,
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
    imageUrl:
      getImageUrl(STORAGE_BUCKETS.PLAYERS, player.image) ??
      getDefaultImage("player"),
  }));
}
