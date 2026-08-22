import { PositionListItem } from "@/types/position";
import { Option } from "@/types/option";

/**
 *
 * @param positions
 * @returns
 */
export function getPositionOptions(positions: PositionListItem[]): Option[] {
  return positions.map((position) => ({
    label: position.name,
    value: position.id,
  }));
}
