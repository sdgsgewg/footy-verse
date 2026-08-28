"use client";

import { SelectField } from "@/components/forms/fields";
import { usePositionCategoryOptions } from "@/hooks/dashboard/position-categories";
import { PositionFilter } from "@/types/position";
import { useTranslations } from "next-intl";

interface PositionFilterContentProps {
  filters: PositionFilter;
  updateFilter: <K extends keyof PositionFilter>(
    key: K,
    value: PositionFilter[K],
  ) => void;
}

export default function PositionFilterContent({
  filters,
  updateFilter,
}: PositionFilterContentProps) {
  const tLabels = useTranslations("dashboard.positions.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.positions.form.placeholders",
  );

  const { positionCategoryOptions } = usePositionCategoryOptions();

  return (
    <>
      {/* Position Category */}
      <SelectField
        label={tLabels("category")}
        name={`category`}
        placeholder={tPlaceholders("category")}
        options={positionCategoryOptions}
        value={filters.categoryId || ""}
        onChange={(value) => updateFilter("categoryId", value)}
      />
    </>
  );
}
