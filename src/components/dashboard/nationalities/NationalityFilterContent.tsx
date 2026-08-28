"use client";

import { ComboboxField } from "@/components/forms/fields";
import { useConfederationOptions } from "@/hooks/confederations/useConfederationOptions";
import { NationalityFilter } from "@/types/nationality";
import { useTranslations } from "next-intl";

interface NationalityFilterContentProps {
  filters: NationalityFilter;
  updateFilter: <K extends keyof NationalityFilter>(
    key: K,
    value: NationalityFilter[K],
  ) => void;
}

export default function NationalityFilterContent({
  filters,
  updateFilter,
}: NationalityFilterContentProps) {
  const tLabels = useTranslations("dashboard.nationalities.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.nationalities.form.placeholders",
  );

  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  const { confederationOptions } = useConfederationOptions();

  return (
    <>
      {/* Confederation */}
      <ComboboxField
        label={tLabels("confederation")}
        name={`confederation`}
        options={confederationOptions}
        placeholder={tPlaceholders("confederation")}
        searchPlaceholder={tCommon("combobox.searchEntity", {
          entity: tEntities("confederation").toLowerCase(),
        })}
        emptyMessage={tCommon("combobox.noEntityFound", {
          entity: tEntities("confederation").toLowerCase(),
        })}
        value={filters.confederationId || null}
        onChange={(value) => updateFilter("confederationId", value)}
      />
    </>
  );
}
