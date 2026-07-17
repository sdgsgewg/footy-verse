import { STORAGE_BUCKETS } from "@/lib/storage";
import { getDefaultImage } from "@/lib/images/default-image";
import { getImageUrl } from "@/lib/images/image-url";

import { ClubListItem } from "@/types/club";
import { SelectOption } from "@/types/select";

export function toClubOptions(clubs: ClubListItem[]): SelectOption[] {
  return clubs.map((club) => ({
    id: club.id,
    name: club.name,
    imageUrl:
      getImageUrl(STORAGE_BUCKETS.CLUBS, club.image) ?? getDefaultImage("club"),
  }));
}
