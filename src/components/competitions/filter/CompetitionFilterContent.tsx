"use client";

import { SelectField } from "@/components/shared/fields";
import { Gender } from "@/enums/Gender";
import { ParticipantType } from "@/enums/ParticipantType";
import { useCompetitionFilterOptions } from "@/hooks/competitions";

import { CompetitionFilter } from "@/types/competition";
import { useTranslations } from "next-intl";

interface CompetitionFilterContentProps {
  filters: CompetitionFilter;
  updateFilter: <K extends keyof CompetitionFilter>(
    key: K,
    value: CompetitionFilter[K],
  ) => void;
  showLabel?: boolean;
}

export default function CompetitionFilterContent({
  filters,
  updateFilter,
  showLabel = false,
}: CompetitionFilterContentProps) {
  const tLabels = useTranslations("dashboard.competitions.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.competitions.form.placeholders",
  );

  const {
    competitionCategoryOptions,
    competitionScopeOptions,
    participantTypeOptions,
    genderOptions,
    loading,
  } = useCompetitionFilterOptions();

  return (
    <>
      {/* Competition Category */}
      <SelectField
        label={showLabel ? tLabels("classification.category") : undefined}
        name={`competition_category`}
        placeholder={tPlaceholders("classification.category")}
        loading={loading.competitionCategory}
        options={competitionCategoryOptions}
        value={filters.categoryId || ""}
        onValueChange={(value) => updateFilter("categoryId", value)}
      />

      {/* Competition Scope */}
      <SelectField
        label={showLabel ? tLabels("scopeAndLocation.scope") : undefined}
        name={`competition_scope`}
        placeholder={tPlaceholders("scopeAndLocation.scope")}
        loading={loading.competitionScope}
        options={competitionScopeOptions}
        value={filters.scopeId || ""}
        onValueChange={(value) => updateFilter("scopeId", value)}
      />

      {/* Participant Type */}
      <SelectField
        label={
          showLabel ? tLabels("classification.participantType") : undefined
        }
        name="participant_type"
        placeholder={tPlaceholders("classification.participantType")}
        options={participantTypeOptions}
        value={filters.participantType || ""}
        onValueChange={(value) =>
          updateFilter("participantType", value as ParticipantType)
        }
      />

      {/* Gender */}
      <SelectField
        label={showLabel ? tLabels("classification.gender") : undefined}
        name="gender"
        placeholder={tPlaceholders("classification.gender")}
        options={genderOptions}
        value={filters.gender || ""}
        onValueChange={(value) => updateFilter("gender", value as Gender)}
      />
    </>
  );
}
