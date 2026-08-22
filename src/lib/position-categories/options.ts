import { PositionCategoryListItem } from "@/types/position-category";
import { Option } from "@/types/option";

/**
 *
 * @param positionCategories
 * @returns
 */
export function getPositionCategoryOptions(
  positionCategories: PositionCategoryListItem[],
): Option[] {
  return positionCategories.map((pc) => ({
    label: pc.name,
    value: pc.id,
  }));
}
