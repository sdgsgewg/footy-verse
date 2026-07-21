import { Nationality, ParentClub } from "@/types/club";
import { ClubSummary, NationalitySummary } from "@/types/player";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";

/**
 *
 * @param nation
 * @returns Nationality | null
 */
export function getModifiedNation(
  nation: NationalitySummary | null,
): Nationality | null {
  const modifiedNation = nation
    ? {
        id: nation.id,
        imageUrl: getImageUrl(
          "nationality",
          STORAGE_BUCKETS.NATIONALITIES,
          nation.image,
        ),
        name: nation.name,
      }
    : null;

  return modifiedNation;
}

/**
 *
 * @param parentClub
 * @returns ParentClub | null
 */
export function getModifiedParentClub(
  parentClub: ClubSummary | null,
): ParentClub | null {
  const modifiedParentClub = parentClub
    ? {
        id: parentClub.id,
        imageUrl: getImageUrl("club", STORAGE_BUCKETS.CLUBS, parentClub.image),
        name: parentClub.name,
      }
    : null;

  return modifiedParentClub;
}
