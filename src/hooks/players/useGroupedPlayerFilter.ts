import { GroupedPlayerFilter } from "@/types/player";
import { useFilters } from "../filter";

const DEFAULT_FILTER: GroupedPlayerFilter = {
  search: "",

  nationId: undefined,

  clubTeamId: undefined,
  nationalTeamId: undefined,

  sortBy: "name",
  sortOrder: "asc",
};

export default function useGroupedPlayerFilter() {
  const crud = useFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
