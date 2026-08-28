"use client";

import { SelectField } from "@/components/forms/fields";
import { useCompetitionCategoryOptions } from "@/hooks/dashboard/competition-categories";
import { useCompetitionScopeOptions } from "@/hooks/dashboard/competition-scopes/useCompetitionScopeOptions";
import { CompetitionFilter } from "@/types/competition";
import { useTranslations } from "next-intl";

interface CompetitionFilterContentProps {
  filters: CompetitionFilter;
  updateFilter: <K extends keyof CompetitionFilter>(
    key: K,
    value: CompetitionFilter[K],
  ) => void;
}

export default function CompetitionFilterContent({
  filters,
  updateFilter,
}: CompetitionFilterContentProps) {
  const tLabels = useTranslations("dashboard.competitions.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.competitions.form.placeholders",
  );

  const { competitionCategoryOptions } = useCompetitionCategoryOptions();

  const { competitionScopeOptions } = useCompetitionScopeOptions();

  return (
    <>
      {/* Competition Category */}
      <SelectField
        label={tLabels("classification.category")}
        name={`competition_category`}
        placeholder={tPlaceholders("classification.category")}
        options={competitionCategoryOptions}
        value={filters.categoryId || ""}
        onChange={(value) => updateFilter("categoryId", value)}
      />

      {/* Competition Scope */}
      <SelectField
        label={tLabels("scopeAndLocation.scope")}
        name={`competition_scope`}
        placeholder={tPlaceholders("scopeAndLocation.scope")}
        options={competitionScopeOptions}
        value={filters.scopeId || ""}
        onChange={(value) => updateFilter("scopeId", value)}
      />
    </>
  );
}
