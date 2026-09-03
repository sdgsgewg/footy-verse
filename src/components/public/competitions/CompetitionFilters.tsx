import { useTranslations } from "next-intl";
import { SearchFilter } from "@/components/shared/filter";
import { CompetitionFilter } from "@/types/competition";
import { useCompetitionFilterOptions } from "@/hooks/competitions";
import { SelectField } from "@/components/forms/fields";
import { ParticipantType } from "@/enums/ParticipantType";
import { Gender } from "@/enums/Gender";

interface CompetitionFiltersProps {
  filters: CompetitionFilter;
  updateFilter: <K extends keyof CompetitionFilter>(
    key: K,
    value: CompetitionFilter[K],
  ) => void;
  isSearching: boolean;
}

const CompetitionFilters = ({
  filters,
  updateFilter,
  isSearching,
}: CompetitionFiltersProps) => {
  const tPlaceholders = useTranslations(
    "dashboard.competitions.form.placeholders",
  );

  const tCommon = useTranslations("common");

  const {
    competitionCategoryOptions,
    competitionScopeOptions,
    participantTypeOptions,
    genderOptions,
    loading,
  } = useCompetitionFilterOptions();

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <SearchFilter
        value={filters.search}
        placeholder={tCommon("search.placeholder")}
        isSearching={isSearching}
        onChange={(value) => updateFilter("search", value)}
      />

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Competition Category */}
        <SelectField
          name={`competition_category`}
          placeholder={tPlaceholders("classification.category")}
          loading={loading.competitionCategory}
          options={competitionCategoryOptions}
          value={filters.categoryId || ""}
          onChange={(value) => updateFilter("categoryId", value)}
        />

        {/* Competition Scope */}
        <SelectField
          name={`competition_scope`}
          placeholder={tPlaceholders("scopeAndLocation.scope")}
          loading={loading.competitionScope}
          options={competitionScopeOptions}
          value={filters.scopeId || ""}
          onChange={(value) => updateFilter("scopeId", value)}
        />

        {/* Participant Type */}
        <SelectField
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
          name="gender"
          placeholder={tPlaceholders("classification.gender")}
          options={genderOptions}
          value={filters.gender || ""}
          onChange={(value) => updateFilter("gender", value as Gender)}
        />
      </div>
    </div>
  );
};

export default CompetitionFilters;
