import { NationalitySummary } from "@/types/player";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { NationalityResponse } from "@/types/club";

/**
 *
 * @param nation
 * @returns Nationality | null
 */
export function getModifiedNation(
  nation: NationalitySummary | null,
): NationalityResponse | null {
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
