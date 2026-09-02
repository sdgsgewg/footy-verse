"use client";

import { useMemo } from "react";
import { ClubFilter } from "@/types/club";
import { useNationalityOptions } from "@/hooks/nationalities";
import { ActiveFiltersBar } from "@/components/shared/filter";

interface Props {
  filters: ClubFilter;

  updateFilter: <K extends keyof ClubFilter>(
    key: K,
    value: ClubFilter[K],
  ) => void;

  clearFilters: () => void;
}

export default function ClubActiveFiltersBar({
  filters,
  updateFilter,
  clearFilters,
}: Props) {
  const { nationalityOptions } = useNationalityOptions();

  const nationMap = useMemo(() => {
    return new Map(
      nationalityOptions.map((nation) => [nation.value, nation.label]),
    );
  }, [nationalityOptions]);

  const chips = [];

  if (filters.search) {
    chips.push({
      key: "search",
      label: `Search: ${filters.search}`,
      onRemove: () => updateFilter("search", ""),
    });
  }

  if (filters.nationId) {
    chips.push({
      key: "nation",
      label: nationMap.get(filters.nationId) ?? filters.nationId,
      onRemove: () => updateFilter("nationId", undefined),
    });
  }

  if (chips.length === 0) return null;

  return <ActiveFiltersBar chips={chips} clearFilters={clearFilters} />;
}
