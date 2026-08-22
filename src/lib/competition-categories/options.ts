import { CompetitionCategoryListItem } from "@/types/competition-category";
import { Option } from "@/types/option";

/**
 *
 * @param competitionCategories
 * @returns
 */
export function getCompetitionCategoryOptions(
  competitionCategories: CompetitionCategoryListItem[],
): Option[] {
  return competitionCategories.map((category) => ({
    label: category.name,
    value: category.id,
  }));
}
