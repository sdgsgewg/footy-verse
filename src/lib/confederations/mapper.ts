import {
  ConfederationDetailResponse,
  ConfederationEditResponse,
  ConfederationListItem,
  DbConfederationDetailRow,
  DbConfederationListRow,
} from "@/types/confederation";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { mapRegionResponse } from "../regions/mapper";

export function mapConfederationListItem(
  confederation: DbConfederationListRow,
): ConfederationListItem {
  const { id, image, name, slug, founded, region } = confederation;

  return {
    id,
    imageUrl: getImageUrl(
      "confederation",
      STORAGE_BUCKETS.CONFEDERATIONS,
      image,
    ),
    name,
    slug,
    founded: founded ?? null,
    region: mapRegionResponse(region),
  };
}

export function mapConfederationEditResponse(
  confederation: DbConfederationDetailRow,
): ConfederationEditResponse {
  const {
    id,
    image,
    name,
    short_name,
    founded,
    headquarters,
    website,
    region_id,
  } = confederation;

  return {
    id,
    image,
    name,
    shortName: short_name,
    founded,
    headquarters,
    website,
    regionId: region_id,
  };
}

export function mapConfederationDetailResponse(
  confederation: DbConfederationDetailRow,
): ConfederationDetailResponse {
  const {
    id,
    image,
    name,
    short_name,
    slug,
    founded,
    headquarters,
    website,
    region,
  } = confederation;

  return {
    id,
    imageUrl: getImageUrl(
      "confederation",
      STORAGE_BUCKETS.CONFEDERATIONS,
      image,
    ),
    name,
    shortName: short_name,
    slug,
    founded: founded ?? "-",
    headquarters: headquarters ?? "-",
    website: website ?? "-",
    region: mapRegionResponse(region),
  };
}
