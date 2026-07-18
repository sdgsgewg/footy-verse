import { SeasonListItem } from "@/types/season";
import { SelectOption } from "@/types/select";

/**
 *
 * @param seasons
 * @returns
 */
export function getSeasonOptions(seasons: SeasonListItem[]): SelectOption[] {
  return seasons.map((season) => ({
    label: season.name,
    value: season.id,
  }));
}
