import { SeasonListItem } from "@/types/season";
import { SelectOption } from "@/types/select";

export function toSeasonOptions(seasons: SeasonListItem[]): SelectOption[] {
  return seasons.map((season) => ({
    id: season.id,
    name: season.name,
  }));
}
