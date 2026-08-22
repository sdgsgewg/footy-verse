import { Option } from "@/types/option";
import { ClubListItem } from "@/types/club";
import { getSquadTypeLabel } from "./labels";
import { SquadType } from "@/enums/SquadType";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns
 */
// Filter tinggal getSquadTypeOptions()
// Form tinggal getSquadTypeOptions()

export const getSquadTypeOptions = (t: Translate): Option[] =>
  Object.values(SquadType).map((type) => ({
    label: getSquadTypeLabel(type, t),
    value: type,
  }));

/**
 *
 * @param clubs
 * @returns
 */
export function getClubOptions(clubs: ClubListItem[]): Option[] {
  return clubs.map((club) => ({
    label: club.name,
    value: club.id,
    imageUrl: club.imageUrl,
  }));
}
