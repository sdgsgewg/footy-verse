import {
  DbRegionDetailRow,
  DbRegionListRow,
  RegionDetailResponse,
  RegionEditResponse,
  RegionListItem,
} from "@/types/region";
import { getImageUrl } from "../images/image-url";
import { STORAGE_BUCKETS } from "../storage";
import { RegionType } from "@/enums/RegionType";

export function mapRegionListItem(region: DbRegionListRow): RegionListItem {
  const { id, image, name, slug, region_type, parent_region } = region;

  const parent = parent_region?.[0] ?? null;

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
