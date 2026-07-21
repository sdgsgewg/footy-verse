import { NationalityListItem } from "@/types/nationality";
import { SelectOption } from "@/types/select";

/**
 *
 * @param nationalities
 * @returns
 */
export function getNationalityOptions(
  nationalities: NationalityListItem[],
): SelectOption[] {
  return nationalities.map((nation) => ({
    label: nation.name,
    value: nation.id,
    imageUrl: nation.imageUrl,
  }));
}
