import { ClubType } from "@/enums/ClubType";
import { SelectOption } from "@/types/select";
import { getClubTypeLabel } from "./labels";
import { ClubListItem } from "@/types/club";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { getDefaultImage } from "../images/default-image";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns
 */
// Filter tinggal getClubTypeOptions()
// Form tinggal getClubTypeOptions()

export const getClubTypeOptions = (t: Translate): SelectOption[] =>
  Object.values(ClubType).map((type) => ({
    label: getClubTypeLabel(type, t),
    value: type,
  }));

/**
 *
 * @param clubs
 * @returns
 */
export function getClubOptions(clubs: ClubListItem[]): SelectOption[] {
  return clubs.map((club) => ({
    label: club.name,
    value: club.id,
    imageUrl:
      getImageUrl(STORAGE_BUCKETS.CLUBS, club.image) ?? getDefaultImage("club"),
  }));
}
