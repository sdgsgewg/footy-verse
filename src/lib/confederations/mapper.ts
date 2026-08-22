import {
  ConfederationDetailResponse,
  ConfederationEditResponse,
  ConfederationListItem,
  ConfederationResponse,
  DbConfederationDetailRow,
  DbConfederationListRow,
  DbConfederationRow,
} from "@/types/confederation";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { mapRegionResponse } from "../regions/mapper";
import { LocationResponse } from "@/types/competition";
import { DbOptionListRow } from "@/types/database";
import { Option } from "@/types/option";

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

export function mapConfederationOption(confederation: DbOptionListRow): Option {
  const { id, name, image } = confederation;

  return {
    label: name,
    value: id,
    imageUrl: getImageUrl(
      "confederation",
      STORAGE_BUCKETS.CONFEDERATIONS,
      image,
    ),
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

// Helpers

// For Competition

export function mapConfederationToLocationResponse(
  confederation: DbConfederationRow,
): LocationResponse {
  const { id, name, image } = confederation;

  return {
    type: "confederation" as const,
    id,
    imageUrl: getImageUrl(
      "confederation",
      STORAGE_BUCKETS.CONFEDERATIONS,
      image,
    ),
    name,
  };
}

// For Nationality

export function mapConfederationResponse(
  confederation: DbConfederationRow,
): ConfederationResponse {
  const { id, name, image } = confederation;

  return {
    id,
    imageUrl: getImageUrl(
      "confederation",
      STORAGE_BUCKETS.CONFEDERATIONS,
      image,
    ),
    name,
  };
}
