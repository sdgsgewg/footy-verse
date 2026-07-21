import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import {
  ClubDetailResponse,
  ClubEditResponse,
  ClubListItem,
  DbClubDetailRow,
  DbClubListRow,
} from "@/types/club";
import { getModifiedNation, getModifiedParentClub } from "./formatter";

export function mapClubListItem(club: DbClubListRow): ClubListItem {
  const { id, image, name, slug, club_type, nation, parent_club } = club;

  return {
    id,
    imageUrl: getImageUrl("club", STORAGE_BUCKETS.CLUBS, image),
    name,
    slug,
    clubType: club_type ?? null,
    nation: getModifiedNation(nation),
    parentClub: getModifiedParentClub(parent_club),
  };
}

export function mapClubEditResponse(club: DbClubDetailRow): ClubEditResponse {
  const { id, image, name, club_type, nation_id, parent_club_id } = club;

  return {
    id,
    image,
    name,
    clubType: club_type,
    nationId: nation_id ?? null,
    parentClubId: parent_club_id ?? null,
  };
}

export function mapClubDetailResponse(
  club: DbClubDetailRow,
): ClubDetailResponse {
  const { id, image, name, slug, club_type, nation, parent_club } = club;

  return {
    id,
    imageUrl: getImageUrl("club", STORAGE_BUCKETS.CLUBS, image),
    name,
    slug,
    clubType: club_type ?? null,
    nation: getModifiedNation(nation),
    parentClub: getModifiedParentClub(parent_club),
  };
}
