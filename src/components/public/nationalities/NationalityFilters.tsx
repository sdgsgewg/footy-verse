import { useTranslations } from "next-intl";
import { NationalityFilter } from "@/types/nationality";
import { SearchFilter } from "@/components/shared/filter";
import { NationalityFilterContent } from "@/components/nationalities/filter";

interface NationalityFiltersProps {
  filters: NationalityFilter;
  updateFilter: <K extends keyof NationalityFilter>(
    key: K,
    value: NationalityFilter[K],
  ) => void;
  isSearching: boolean;
}

const NationalityFilters = ({
  filters,
  updateFilter,
  isSearching,
}: NationalityFiltersProps) => {
  const tCommon = useTranslations("common");

  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* Search */}
      <SearchFilter
        value={filters.search}
        placeholder={tCommon("search.placeholder")}
        isSearching={isSearching}
        onChange={(value) => updateFilter("search", value)}
      />

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <NationalityFilterContent
          filters={filters}
          updateFilter={updateFilter}
        />
      </div>
    </div>
  );
};

export default NationalityFilters;
