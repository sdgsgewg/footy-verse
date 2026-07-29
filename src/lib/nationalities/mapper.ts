import {
  DbNationalityDetailRow,
  DbNationalityListRow,
  NationalityDetailResponse,
  NationalityEditResponse,
  NationalityListItem,
} from "@/types/nationality";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";

export function mapNationalityListItem(
  nationality: DbNationalityListRow,
): NationalityListItem {
  const { id, image, name, slug, fifa_code, confederation } = nationality;

  return {
    id,
    imageUrl: getImageUrl("nationality", STORAGE_BUCKETS.NATIONALITIES, image),
    name,
    slug,
    fifaCode: fifa_code,

    confederation: confederation
      ? {
          id: confederation.id,
          name: confederation.name,
          imageUrl: getImageUrl(
            "confederation",
            STORAGE_BUCKETS.CONFEDERATIONS,
            confederation.image,
          ),
        }
      : null,
  };
}

export function mapNationalityEditResponse(
  nationality: DbNationalityDetailRow,
): NationalityEditResponse {
  const { id, image, name, fifa_code, confederation_id } = nationality;

  return {
    id,
    image,
    name,
    fifaCode: fifa_code,
    confederationId: confederation_id ?? null,
  };
}

export function mapNationalityDetailResponse(
  nationality: DbNationalityDetailRow,
): NationalityDetailResponse {
  const { id, image, name, slug } = nationality;

  return {
    id,
    imageUrl: getImageUrl("nationality", STORAGE_BUCKETS.NATIONALITIES, image),
    name,
    slug,
  };
}
