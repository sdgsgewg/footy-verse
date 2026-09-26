"use client";

import { ComboboxField } from "@/components/shared/fields";
import { useConfederationOptions } from "@/hooks/confederations/useConfederationOptions";
import { useCrudFormTranslations } from "@/hooks/crud";
import { useRegionOptions } from "@/hooks/dashboard/regions";
import { NationalityFilter } from "@/types/nationality";

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
  const { tCommonLabels, tCommonPlaceholders } = useCrudFormTranslations();

  const { confederationOptions, loading: isConfederationLoading } =
    useConfederationOptions();

  const { regionOptions, loading: isRegionLoading } = useRegionOptions();

  return (
    <>
      {/* Confederation */}
      <ComboboxField
        label={showLabel ? tCommonLabels("confederation") : undefined}
        name={`confederation`}
        entityKey="confederation"
        options={confederationOptions}
        loading={isConfederationLoading}
        placeholder={tCommonPlaceholders("confederation")}
        value={filters.confederationId || null}
        onChange={(value) => updateFilter("confederationId", value)}
      />

      {/* Region */}
      <ComboboxField
        label={showLabel ? tCommonLabels("region") : undefined}
        name={`region`}
        entityKey="region"
        options={regionOptions}
        loading={isRegionLoading}
        placeholder={tCommonPlaceholders("region")}
        value={filters.regionId || null}
        onChange={(value) => updateFilter("regionId", value)}
      />
    </>
  );
}
