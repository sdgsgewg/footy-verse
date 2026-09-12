import { useTranslations } from "next-intl";
import { SearchFilter } from "@/components/shared/filter";
import { CompetitionFilter } from "@/types/competition";
import { CompetitionFilterContent } from "@/components/competitions/filter";

interface CompetitionFiltersProps {
  filters: CompetitionFilter;
  updateFilter: <K extends keyof CompetitionFilter>(
    key: K,
    value: CompetitionFilter[K],
  ) => void;
  isSearching: boolean;
}

const CompetitionFilters = ({
  filters,
  updateFilter,
  isSearching,
}: CompetitionFiltersProps) => {
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
        <CompetitionFilterContent
          filters={filters}
          updateFilter={updateFilter}
        />
      </div>
    </div>
  );
};

export default CompetitionFilters;
