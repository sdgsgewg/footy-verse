import { GroupedPlayerFilter } from "@/types/player";
import { useCrudFilters } from "../crud/useCrudFilters";

const DEFAULT_FILTER: GroupedPlayerFilter = {
  search: "",

  nationId: undefined,

  clubTeamId: undefined,
  nationalTeamId: undefined,

  sortBy: "name",
  sortOrder: "asc",
};

export default function useGroupedPlayerFilter() {
  const crud = useCrudFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
