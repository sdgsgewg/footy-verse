"use client";

import { useMemo } from "react";
import { ActiveFiltersBar } from "@/components/shared/filter";
import { CompetitionFilter } from "@/types/competition";
import { useCompetitionFilterOptions } from "@/hooks/competitions";

interface Props {
  filters: CompetitionFilter;

  updateFilter: <K extends keyof CompetitionFilter>(
    key: K,
    value: CompetitionFilter[K],
  ) => void;

  clearFilters: () => void;
}

export default function CompetitionActiveFiltersBar({
  filters,
  updateFilter,
  clearFilters,
}: Props) {
  const {
    competitionCategoryOptions,
    competitionScopeOptions,
    participantTypeOptions,
    genderOptions,
  } = useCompetitionFilterOptions();

  const competitionCategorynMap = useMemo(() => {
    return new Map(
      competitionCategoryOptions.map((position) => [
        position.value,
        position.label,
      ]),
    );
  }, [competitionCategoryOptions]);

  const competitionScopeMap = useMemo(() => {
    return new Map(
      competitionScopeOptions.map((nation) => [nation.value, nation.label]),
    );
  }, [competitionScopeOptions]);

  const participantTypeMap = useMemo(() => {
    return new Map(participantTypeOptions.map((ct) => [ct.value, ct.label]));
  }, [participantTypeOptions]);

  const genderMap = useMemo(() => {
    return new Map(genderOptions.map((ct) => [ct.value, ct.label]));
  }, [genderOptions]);

  const chips = [];

  if (filters.search) {
    chips.push({
      key: "search",
      label: `Search: ${filters.search}`,
      onRemove: () => updateFilter("search", ""),
    });
  }

  if (filters.categoryId) {
    chips.push({
      key: "category",
      label:
        competitionCategorynMap.get(filters.categoryId) ?? filters.categoryId,
      onRemove: () => updateFilter("categoryId", undefined),
    });
  }

  if (filters.scopeId) {
    chips.push({
      key: "scope",
      label: competitionScopeMap.get(filters.scopeId) ?? filters.scopeId,
      onRemove: () => updateFilter("scopeId", undefined),
    });
  }

  if (filters.participantType) {
    chips.push({
      key: "participantType",
      label:
        participantTypeMap.get(filters.participantType) ??
        filters.participantType,
      onRemove: () => updateFilter("participantType", undefined),
    });
  }

  if (filters.gender) {
    chips.push({
      key: "gender",
      label: genderMap.get(filters.gender) ?? filters.gender,
      onRemove: () => updateFilter("gender", undefined),
    });
  }

  if (chips.length === 0) return null;

  return <ActiveFiltersBar chips={chips} clearFilters={clearFilters} />;
}
