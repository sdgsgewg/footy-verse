import { useTranslations } from "next-intl";
import ComboboxField from "@/components/forms/fields/ComboboxField";
import { SearchFilter } from "@/components/shared/filter";
import { PlayerFilter } from "@/types/player";
import { usePlayerFilterOptions } from "@/hooks/players";

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
  const tPlaceholders = useTranslations(
    "dashboard.players.filter.form.placeholders",
  );

  const tCommon = useTranslations("common");
  const tEntities = useTranslations("entities");

  const { positionOptions, nationalityOptions, clubTeamOptions, loading } =
    usePlayerFilterOptions();

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
        {/* Position */}
        <ComboboxField
          name={`position`}
          options={positionOptions}
          placeholder={tPlaceholders("position")}
          loading={loading.position}
          searchPlaceholder={tCommon("combobox.searchEntity", {
            entity: tEntities("position").toLowerCase(),
          })}
          emptyMessage={tCommon("combobox.noEntityFound", {
            entity: tEntities("position").toLowerCase(),
          })}
          value={filters.positionId || null}
          onChange={(value) => updateFilter("positionId", value)}
        />

        {/* Nationality */}
        <ComboboxField
          name={`nation`}
          options={nationalityOptions}
          placeholder={tPlaceholders("nation")}
          loading={loading.nationality}
          searchPlaceholder={tCommon("combobox.searchEntity", {
            entity: tEntities("nationality").toLowerCase(),
          })}
          emptyMessage={tCommon("combobox.noEntityFound", {
            entity: tEntities("nationality").toLowerCase(),
          })}
          value={filters.nationId || null}
          onChange={(value) => updateFilter("nationId", value)}
        />

        {/* Club Team */}
        <ComboboxField
          name={`club_team`}
          options={clubTeamOptions}
          placeholder={tPlaceholders("club")}
          loading={loading.clubTeam}
          searchPlaceholder={tCommon("combobox.searchEntity", {
            entity: tEntities("club").toLowerCase(),
          })}
          emptyMessage={tCommon("combobox.noEntityFound", {
            entity: tEntities("club").toLowerCase(),
          })}
          value={filters.clubTeamId || null}
          onChange={(value) => updateFilter("clubTeamId", value)}
        />
      </div>
    </div>
  );
};

export default PlayerFilters;
