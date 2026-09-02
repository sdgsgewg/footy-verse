"use client";

import { ComboboxField } from "@/components/forms/fields";
import { usePlayerFilterOptions } from "@/hooks/players";
import { PlayerFilter } from "@/types/player";
import { useTranslations } from "next-intl";

interface PlayerFilterContentProps {
  filters: PlayerFilter;
  updateFilter: <K extends keyof PlayerFilter>(
    key: K,
    value: PlayerFilter[K],
  ) => void;
}

export default function PlayerFilterContent({
  filters,
  updateFilter,
}: PlayerFilterContentProps) {
  const tLabels = useTranslations("dashboard.players.filter.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.players.filter.form.placeholders",
  );

  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  const { positionOptions, nationalityOptions, clubTeamOptions, loading } =
    usePlayerFilterOptions();

  return (
    <>
      {/* Position */}
      <ComboboxField
        label={tLabels("position")}
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
        label={tLabels("nation")}
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
        label={tLabels("club")}
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
    </>
  );
}
