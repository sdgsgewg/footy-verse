import { RegionType } from "@/enums/RegionType";
import { RegionListItem } from "@/types/region";
import { SelectOption } from "@/types/select";
import { getRegionTypeLabel } from "./labels";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns
 */
export const getRegionTypeOptions = (t: Translate): SelectOption[] =>
  Object.values(RegionType).map((type) => ({
    label: getRegionTypeLabel(type, t),
    value: type,
  }));

/**
 *
 * @param regions
 * @returns
 */
export function getRegionOptions(regions: RegionListItem[]): SelectOption[] {
  return regions.map((region) => ({
    label: region.name,
    value: region.id,
    imageUrl: region.imageUrl,
  }));
}
