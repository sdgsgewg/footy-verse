"use client";

import { SelectField } from "@/components/forms/fields";
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
}

export default function CompetitionFilterContent({
  filters,
  updateFilter,
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
        label={tLabels("classification.category")}
        name={`competition_category`}
        placeholder={tPlaceholders("classification.category")}
        loading={loading.competitionCategory}
        options={competitionCategoryOptions}
        value={filters.categoryId || ""}
        onChange={(value) => updateFilter("categoryId", value)}
      />

      {/* Competition Scope */}
      <SelectField
        label={tLabels("scopeAndLocation.scope")}
        name={`competition_scope`}
        placeholder={tPlaceholders("scopeAndLocation.scope")}
        loading={loading.competitionScope}
        options={competitionScopeOptions}
        value={filters.scopeId || ""}
        onChange={(value) => updateFilter("scopeId", value)}
      />

      {/* Participant Type */}
      <SelectField
        label={tLabels("classification.participantType")}
        name="participant_type"
        placeholder={tPlaceholders("classification.participantType")}
        options={participantTypeOptions}
        value={filters.participantType || ""}
        onChange={(value) =>
          updateFilter("participantType", value as ParticipantType)
        }
      />

      {/* Gender */}
      <SelectField
        label={tLabels("classification.gender")}
        name="gender"
        placeholder={tPlaceholders("classification.gender")}
        options={genderOptions}
        value={filters.gender || ""}
        onChange={(value) => updateFilter("gender", value as Gender)}
      />
    </>
  );
}
