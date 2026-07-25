import { PositionCategoryListItem } from "@/types/position-category";
import { SelectOption } from "@/types/select";

/**
 *
 * @param positionCategories
 * @returns
 */
export function getPositionCategoryOptions(
  positionCategories: PositionCategoryListItem[],
): SelectOption[] {
  return positionCategories.map((pc) => ({
    label: pc.name,
    value: pc.id,
  }));
}
