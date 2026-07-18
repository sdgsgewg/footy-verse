import { SortType } from "@/types/sort";
import { useMemo, useState } from "react";
import { useDebounce } from "../useDebounce";
import { ClubListItem } from "@/types/club";
import { useRouter } from "@/navigation";

export interface ClubFilter {
  name: string;
  nationId: string | null | undefined;
  clubType: string | null | undefined;
  sort: SortType;
}

export default function useClubFilter() {
  const router = useRouter();

  const [filters, setFilters] = useState<ClubFilter>({
    name: "",
    nationId: undefined,
    clubType: undefined,
    sort: "newest",
  });

  const debouncedname = useDebounce(filters.name, 400);

  const isSearching = filters.name !== debouncedname;

  const clearFilters = () => {
    const reset: ClubFilter = {
      name: "",
      nationId: undefined,
      clubType: undefined,
      sort: "newest",
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
