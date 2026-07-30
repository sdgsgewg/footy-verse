import { CompetitionCategoryListItem } from "@/types/competition-category";
import { SelectOption } from "@/types/select";

/**
 *
 * @param competitionCategories
 * @returns
 */
export function getCompetitionCategoryOptions(
  competitionCategories: CompetitionCategoryListItem[],
): SelectOption[] {
  return competitionCategories.map((category) => ({
    label: category.name,
    value: category.id,
  }));
}
