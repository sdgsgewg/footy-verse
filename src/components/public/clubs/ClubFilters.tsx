import { useTranslations } from "next-intl";
import { ClubFilter } from "@/types/club";
import { SearchFilter } from "@/components/shared/filter";
import { ClubFilterContent } from "@/components/clubs/filter";

interface ClubFiltersProps {
  filters: ClubFilter;
  updateFilter: <K extends keyof ClubFilter>(
    key: K,
    value: ClubFilter[K],
  ) => void;
  isSearching: boolean;
}

const ClubFilters = ({
  filters,
  updateFilter,
  isSearching,
}: ClubFiltersProps) => {
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
        <ClubFilterContent filters={filters} updateFilter={updateFilter} />
      </div>
    </div>
  );
};

export default ClubFilters;
