import { Nationality } from "@/types/club";
import { NationalitySummary } from "@/types/player";
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
