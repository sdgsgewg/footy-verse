"use client";

import { ComboboxField } from "@/components/forms/fields";
import { useNationalityOptions } from "@/hooks/nationalities";
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

  const { nationalityOptions } = useNationalityOptions();

  return (
    <>
      {/* Nationality */}
      <ComboboxField
        label={tLabels("nation")}
        name={`nation`}
        options={nationalityOptions}
        placeholder={tPlaceholders("nation")}
        searchPlaceholder={tCommon("combobox.searchEntity", {
          entity: tEntities("nationality").toLowerCase(),
        })}
        emptyMessage={tCommon("combobox.noEntityFound", {
          entity: tEntities("nationality").toLowerCase(),
        })}
        value={filters.nationId || null}
        onChange={(value) => updateFilter("nationId", value)}
      />
    </>
  );
}
