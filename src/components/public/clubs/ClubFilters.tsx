import { useTranslations } from "next-intl";
import ComboboxField from "@/components/forms/fields/ComboboxField";
import { ClubFilter } from "@/types/club";
import { useNationalityOptions } from "@/hooks/nationalities";
import { SearchFilter } from "@/components/shared/filter";

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
  const tPlaceholders = useTranslations("dashboard.clubs.form.placeholders");

  const tCommon = useTranslations("common");
  const tEntities = useTranslations("entities");

  const { nationalityOptions } = useNationalityOptions();

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
        {/* Nationality */}
        <ComboboxField
          name={`nationality`}
          options={nationalityOptions}
          placeholder={tPlaceholders("nation")}
          searchPlaceholder={tCommon("combobox.searchEntity", {
            entity: tEntities("nationality").toLowerCase(),
          })}
          emptyMessage={tCommon("combobox.noEntityFound", {
            entity: tEntities("nationality").toLowerCase(),
          })}
          value={filters.nationId ?? null}
          onChange={(value) => updateFilter("nationId", value ?? undefined)}
        />
      </div>
    </div>
  );
};

export default ClubFilters;
