"use client";

import { ComboboxField } from "@/components/forms/fields";
import { useNationalityOptions } from "@/hooks/nationalities";
import { ClubFilter } from "@/types/club";
import { useTranslations } from "next-intl";

interface ClubFilterContentProps {
  filters: ClubFilter;
  updateFilter: <K extends keyof ClubFilter>(
    key: K,
    value: ClubFilter[K],
  ) => void;
}

export default function ClubFilterContent({
  filters,
  updateFilter,
}: ClubFilterContentProps) {
  const tLabels = useTranslations("dashboard.clubs.form.labels");
  const tPlaceholders = useTranslations("dashboard.clubs.form.placeholders");

  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  const { nationalityOptions } = useNationalityOptions();

  return (
    <div className="space-y-4">
      {/* Nationality */}
      <ComboboxField
        label={tLabels("nation")}
        name={`nationality`}
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
        required
      />
    </div>
  );
}
