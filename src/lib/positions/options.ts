import { PositionListItem } from "@/types/position";
import { SelectOption } from "@/types/select";

/**
 *
 * @param positions
 * @returns
 */
export function getPositionOptions(
  positions: PositionListItem[],
): SelectOption[] {
  return positions.map((position) => ({
    label: position.name,
    value: position.id,
  }));
}
