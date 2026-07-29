import {
  DbRegionDetailRow,
  DbRegionListRow,
  DbRegionRow,
  RegionDetailResponse,
  RegionEditResponse,
  RegionListItem,
  RegionResponse,
} from "@/types/region";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { RegionType } from "@/enums/RegionType";

export function mapRegionListItem(
  region: DbRegionListRow,
  regionMap: Map<string, DbRegionListRow>,
): RegionListItem {
  const { id, image, name, slug, region_type, parent_region_id } = region;

  const parent = parent_region_id
    ? (regionMap.get(parent_region_id) ?? null)
    : null;

  return {
    id,
    imageUrl: getImageUrl("region", STORAGE_BUCKETS.REGIONS, image),
    name,
    slug,
    regionType: region_type,

    parentRegion: parent
      ? {
          id: parent.id,
          name: parent.name,
          imageUrl: getImageUrl(
            "region",
            STORAGE_BUCKETS.REGIONS,
            parent.image,
          ),
        }
      : null,
  };
}

export function mapRegionEditResponse(
  Region: DbRegionDetailRow,
): RegionEditResponse {
  const { id, image, name, region_type, parent_region_id } = Region;

  return {
    id,
    image,
    name,
    regionType: region_type as RegionType,
    parentRegionId: parent_region_id ?? null,
  };
}

export function mapRegionDetailResponse(
  region: DbRegionDetailRow,
): RegionDetailResponse {
  const { id, image, name } = region;

  return {
    id,
    imageUrl: getImageUrl("region", STORAGE_BUCKETS.REGIONS, image),
    name,
  };
}

export function mapRegionResponse(region: DbRegionRow): RegionResponse {
  const { id, image, name } = region;

  return {
    id,
    name,
    imageUrl: getImageUrl("region", STORAGE_BUCKETS.REGIONS, image),
  };
}
