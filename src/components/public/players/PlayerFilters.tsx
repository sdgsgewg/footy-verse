import { useTranslations } from "next-intl";
import { SearchFilter } from "@/components/shared/filter";
import { PlayerFilter } from "@/types/player";
import { PlayerFilterContent } from "@/components/players/filter";

interface PlayerFiltersProps {
  filters: PlayerFilter;
  updateFilter: <K extends keyof PlayerFilter>(
    key: K,
    value: PlayerFilter[K],
  ) => void;
  isSearching: boolean;
}

const PlayerFilters = ({
  filters,
  updateFilter,
  isSearching,
}: PlayerFiltersProps) => {
  const tCommon = useTranslations("common");

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <SearchFilter
        value={filters.search}
        placeholder={tCommon("search.placeholder")}
        isSearching={isSearching}
        onChange={(value) => updateFilter("search", value)}
      />

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <PlayerFilterContent filters={filters} updateFilter={updateFilter} />
      </div>
    </div>
  );
};

export default PlayerFilters;
