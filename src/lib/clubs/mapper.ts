import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import {
  ClubDetailResponse,
  ClubEditResponse,
  ClubListItem,
  DbClubDetailRow,
  DbClubListRow,
} from "@/types/club";
import { getModifiedNation } from "./formatter";

export function mapClubListItem(club: DbClubListRow): ClubListItem {
  const { id, image, name, slug, nation } = club;

  return {
    id,
    imageUrl: getImageUrl("club", STORAGE_BUCKETS.CLUBS, image),
    name,
    slug,
    nation: getModifiedNation(nation),
  };
}

export function mapClubEditResponse(club: DbClubDetailRow): ClubEditResponse {
  const { id, image, name, nation_id } = club;

  return {
    id,
    image,
    name,
    nationId: nation_id ?? null,
  };
}

export function mapClubDetailResponse(
  club: DbClubDetailRow,
): ClubDetailResponse {
  const { id, image, name, slug, nation } = club;

  return {
    id,
    imageUrl: getImageUrl("club", STORAGE_BUCKETS.CLUBS, image),
    name,
    slug,
    nation: getModifiedNation(nation),
  };
}
