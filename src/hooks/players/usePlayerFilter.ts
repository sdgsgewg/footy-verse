import { PlayerFilter } from "@/types/player";
import { useCrudFilters } from "../crud/useCrudFilters";

const DEFAULT_FILTER: PlayerFilter = {
  search: "",

  nationId: undefined,
  clubTeamId: undefined,

  page: 1,
  limit: 20,

  sortBy: "name",
  sortOrder: "asc",
};

export default function usePlayerFilter() {
  return useCrudFilters(DEFAULT_FILTER, {
    shouldResetPage: (previous, next) =>
      previous.search !== next.search ||
      previous.clubTeamId !== next.clubTeamId ||
      previous.nationId !== next.nationId ||
      previous.positionId !== next.positionId,
  });
}
