import { useTranslations } from "next-intl";
import { NationalityFilter } from "@/types/nationality";
import { ComboboxField } from "@/components/forms/fields";
import { useConfederationOptions } from "@/hooks/confederations/useConfederationOptions";
import { SearchFilter } from "@/components/shared/filter";

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
  const tPlaceholders = useTranslations(
    "dashboard.nationalities.form.placeholders",
  );

  const tCommon = useTranslations("common");
  const tEntities = useTranslations("entities");

  const { confederationOptions } = useConfederationOptions();

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
        {/* Confederation Dropdown */}
        <ComboboxField
          name={`confederation`}
          options={confederationOptions}
          placeholder={tPlaceholders("confederation")}
          searchPlaceholder={tCommon("combobox.searchEntity", {
            entity: tEntities("nationality").toLowerCase(),
          })}
          emptyMessage={tCommon("combobox.noEntityFound", {
            entity: tEntities("nationality").toLowerCase(),
          })}
          value={filters.confederationId ?? null}
          onChange={(value) =>
            updateFilter("confederationId", value ?? undefined)
          }
        />
      </div>
    </div>
  );
};

export default NationalityFilters;
