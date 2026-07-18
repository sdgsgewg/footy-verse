import { STORAGE_BUCKETS } from "@/lib/storage";
import { getDefaultImage } from "@/lib/images/default-image";
import { getImageUrl } from "@/lib/images/image-url";

import { NationalityListItem } from "@/types/nationality";
import { SelectOption } from "@/types/select";

/**
 *
 * @param nationalities
 * @returns
 */
export function getNationalityOptions(
  nationalities: NationalityListItem[],
): SelectOption[] {
  return nationalities.map((nation) => ({
    label: nation.name,
    value: nation.id,
    imageUrl:
      getImageUrl(STORAGE_BUCKETS.NATIONALITIES, nation.image) ??
      getDefaultImage("nationality"),
  }));
}
