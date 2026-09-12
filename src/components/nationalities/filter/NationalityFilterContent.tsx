"use client";

import { ComboboxField } from "@/components/shared/fields";
import { useConfederationOptions } from "@/hooks/confederations/useConfederationOptions";
import { NationalityFilter } from "@/types/nationality";
import { useTranslations } from "next-intl";

interface NationalityFilterContentProps {
  filters: NationalityFilter;
  updateFilter: <K extends keyof NationalityFilter>(
    key: K,
    value: NationalityFilter[K],
  ) => void;
  showLabel?: boolean;
}

export default function NationalityFilterContent({
  filters,
  updateFilter,
  showLabel = false,
}: NationalityFilterContentProps) {
  const tLabels = useTranslations("dashboard.nationalities.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.nationalities.form.placeholders",
  );

  const { confederationOptions, loading: isConfederationLoading } =
    useConfederationOptions();

  return (
    <>
      {/* Confederation */}
      <ComboboxField
        label={showLabel ? tLabels("confederation") : undefined}
        name={`confederation`}
        entityKey="confederation"
        options={confederationOptions}
        loading={isConfederationLoading}
        placeholder={tPlaceholders("confederation")}
        value={filters.confederationId || null}
        onChange={(value) => updateFilter("confederationId", value)}
      />
    </>
  );
}
