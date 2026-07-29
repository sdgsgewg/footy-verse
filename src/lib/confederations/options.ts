import { ConfederationListItem } from "@/types/confederation";
import { SelectOption } from "@/types/select";

/**
 *
 * @param confederations
 * @returns
 */
export function getConfederationOptions(
  confederations: ConfederationListItem[],
): SelectOption[] {
  return confederations.map((confederation) => ({
    label: confederation.name,
    value: confederation.id,
    imageUrl: confederation.imageUrl,
  }));
}
