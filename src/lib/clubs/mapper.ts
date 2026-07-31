import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import {
  ClubDetailResponse,
  ClubEditResponse,
  ClubListItem,
  ClubResponse,
  ClubWithNationalityResponse,
  DbClubDetailRow,
  DbClubListRow,
  DbClubRow,
  DbClubWithNationalityRow,
} from "@/types/club";
import { getModifiedNation } from "./formatter";
import { mapNationalityResponse } from "../nationalities/mapper";

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
    nationId: nation_id,
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

// Helper

export function mapClubResponse(club: DbClubRow): ClubResponse {
  const { id, image, name } = club;

  return {
    id,
    imageUrl: getImageUrl("club", STORAGE_BUCKETS.CLUBS, image),
    name,
  };
}

export function mapClubWithNationalityResponse(
  club: DbClubWithNationalityRow,
): ClubWithNationalityResponse {
  const { id, image, name, nationality } = club;

  return {
    id,
    imageUrl: getImageUrl("club", STORAGE_BUCKETS.CLUBS, image),
    name,

    nation: mapNationalityResponse(nationality),
  };
}
