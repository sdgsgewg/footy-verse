import { STORAGE_BUCKETS } from "@/lib/storage";
import { getDefaultImage } from "@/lib/images/default-image";
import { getImageUrl } from "@/lib/images/image-url";

import { NationalityListItem } from "@/types/nationality";
import { SelectOption } from "@/types/select";

export function toNationalityOptions(
  nationalities: NationalityListItem[],
): SelectOption[] {
  return nationalities.map((nation) => ({
    id: nation.id,
    name: nation.name,
    imageUrl:
      getImageUrl(STORAGE_BUCKETS.NATIONALITIES, nation.image) ??
      getDefaultImage("nationality"),
  }));
}
