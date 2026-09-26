import {
  DbNationalityDetailRow,
  DbNationalityListRow,
  DbNationalityRow,
  DbNationalityWithConfederationRow,
  NationalityDetailResponse,
  NationalityEditResponse,
  NationalityListItem,
  NationalityResponse,
  NationalityWithConfederationResponse,
} from "@/types/nationality";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { LocationResponse } from "@/types/competition";
import { mapConfederationResponse } from "../confederations/mapper";
import { ENTITY_CONFIG } from "@/config/entities";
import { mapRegionResponse } from "../regions/mapper";

/**
 *
 * @param nationality
 * @returns NationalityListItem
 */
export function mapNationalityListItem(
  nationality: DbNationalityListRow,
): NationalityListItem {
  const { id, image, name, slug, fifa_code, confederation, region } =
    nationality;

  return {
    id,
    imageUrl: getImageUrl(
      "nationality",
      ENTITY_CONFIG["nationality"]["storageBucket"],
      image,
    ),
    name,
    slug,
    fifaCode: fifa_code,

    confederation: confederation
      ? mapConfederationResponse(confederation)
      : null,

    region: region ? mapRegionResponse(region) : null,
  };
}

export function mapNationalityEditResponse(
  nationality: DbNationalityDetailRow,
): NationalityEditResponse {
  const { id, image, name, fifa_code, confederation_id, region_id } =
    nationality;

  return {
    id,
    image,
    name,
    fifaCode: fifa_code,
    confederationId: confederation_id ?? null,
    regionId: region_id ?? null,
  };
}

export function mapNationalityDetailResponse(
  nationality: DbNationalityDetailRow,
): NationalityDetailResponse {
  const { id, image, name, slug, confederation, region } = nationality;

  return {
    id,
    imageUrl: getImageUrl(
      "nationality",
      ENTITY_CONFIG["nationality"]["storageBucket"],
      image,
    ),
    name,
    slug,
    confederation: confederation
      ? mapConfederationResponse(confederation)
      : null,
    region: region ? mapRegionResponse(region) : null,
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

export function mapNationalityWithConfederationResponse(
  nationality: DbNationalityWithConfederationRow,
): NationalityWithConfederationResponse {
  const { id, name, image, confederation } = nationality;

  return {
    id,
    imageUrl: getImageUrl("nationality", STORAGE_BUCKETS.NATIONALITIES, image),
    name,

    confederation: confederation
      ? mapConfederationResponse(confederation)
      : null,
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
