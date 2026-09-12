"use client";

import { ComboboxField } from "@/components/shared/fields";
import { useNationalityOptions } from "@/hooks/nationalities";
import { ClubFilter } from "@/types/club";
import { useTranslations } from "next-intl";

interface ClubFilterContentProps {
  filters: ClubFilter;
  updateFilter: <K extends keyof ClubFilter>(
    key: K,
    value: ClubFilter[K],
  ) => void;
  showLabel?: boolean;
}

export default function ClubFilterContent({
  filters,
  updateFilter,
  showLabel = false,
}: ClubFilterContentProps) {
  const tLabels = useTranslations("dashboard.clubs.form.labels");
  const tPlaceholders = useTranslations("dashboard.clubs.form.placeholders");

  const { nationalityOptions, loading: isNationalityLoading } =
    useNationalityOptions();

  return (
    <>
      {/* Nationality */}
      <ComboboxField
        label={showLabel ? tLabels("nation") : undefined}
        name={`nationality`}
        entityKey="nationality"
        options={nationalityOptions}
        loading={isNationalityLoading}
        placeholder={tPlaceholders("nation")}
        value={filters.nationId || null}
        onChange={(value) => updateFilter("nationId", value)}
      />
    </>
  );
}
