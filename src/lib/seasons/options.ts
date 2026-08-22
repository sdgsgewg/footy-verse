import { SeasonListItem } from "@/types/season";
import { Option } from "@/types/option";

/**
 *
 * @param seasons
 * @returns
 */
export function getSeasonOptions(seasons: SeasonListItem[]): Option[] {
  return seasons.map((season) => ({
    label: season.name,
    value: season.id,
  }));
}
