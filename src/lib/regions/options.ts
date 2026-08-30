import { RegionType } from "@/enums/RegionType";
import { RegionListItem } from "@/types/region";
import { Option } from "@/types/option";
import { getRegionTypeLabel } from "./labels";

type Translate = (key: string) => string;

/**
 *
 * @param t
 * @returns
 */
export const getRegionTypeOptions = (t: Translate): Option[] =>
  Object.values(RegionType).map((type) => ({
    label: getRegionTypeLabel(type, t),
    value: type,
  }));
