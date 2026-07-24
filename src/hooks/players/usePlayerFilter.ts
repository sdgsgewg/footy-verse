import { useDebounce } from "../useDebounce";
import { useRouter } from "@/navigation";
import { PlayerFilter } from "@/types/player";
import { useState } from "react";

export default function usePlayerFilter() {
  const router = useRouter();

  const [filters, setFilters] = useState<PlayerFilter>({
    name: "",
    nationId: undefined,
    clubTeamId: undefined,

    page: 1,
    limit: 20,

    sortBy: "name",
    sortOrder: "asc",
  });

  const debouncedname = useDebounce(filters.name, 400);

  const isSearching = filters.name !== debouncedname;

  const clearFilters = () => {
    const reset: PlayerFilter = {
      name: "",
      nationId: undefined,
      clubTeamId: undefined,

      page: 1,
      limit: 20,

      sortBy: "name",
      sortOrder: "asc",
    };

    setFilters(reset);
    router.push("?"); // reset URL
  };

  return {
    filters,
    setFilters,
    isSearching,
    clearFilters,
  };
}
