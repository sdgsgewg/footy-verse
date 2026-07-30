import {
  DbNationalityDetailRow,
  DbNationalityListRow,
  DbNationalityRow,
  NationalityDetailResponse,
  NationalityEditResponse,
  NationalityListItem,
  NationalityResponse,
} from "@/types/nationality";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { LocationResponse } from "@/types/competition";

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

// Helpers

export function mapNationalityResponse(
  nationality: DbNationalityRow,
): NationalityResponse {
  const { id, name, image } = nationality;

  return {
    id,
    imageUrl: getImageUrl("nationality", STORAGE_BUCKETS.NATIONALITIES, image),
    name,
  };
}

export function mapNationalityToLocationResponse(
  nationality: DbNationalityRow,
): LocationResponse {
  const { id, name, image } = nationality;

  return {
    type: "nationality" as const,
    id,
    imageUrl: getImageUrl("nationality", STORAGE_BUCKETS.NATIONALITIES, image),
    name,
  };
}
