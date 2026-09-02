"use client";

import { ActiveFiltersBar } from "@/components/shared/filter";
import { useConfederations } from "@/hooks/dashboard/confederations";
import { NationalityFilter } from "@/types/nationality";
import { useMemo } from "react";

interface Props {
  filters: NationalityFilter;

  updateFilter: <K extends keyof NationalityFilter>(
    key: K,
    value: NationalityFilter[K],
  ) => void;

  clearFilters: () => void;
}

export default function NationalityActiveFiltersBar({
  filters,
  updateFilter,
  clearFilters,
}: Props) {
  const { confederations } = useConfederations();

  const confederationMap = useMemo(() => {
    return new Map(
      confederations.map((confederation) => [
        confederation.id,
        confederation.name,
      ]),
    );
  }, [confederations]);

  const chips = [];

  // Search
  if (filters.search) {
    chips.push({
      key: "search",
      label: `Search: ${filters.search}`,
      onRemove: () => updateFilter("search", ""),
    });
  }
  // Confederation
  if (filters.confederationId) {
    chips.push({
      key: "confederation",
      label:
        confederationMap.get(filters.confederationId) ??
        filters.confederationId,
      onRemove: () => updateFilter("confederationId", undefined),
    });
  }

  if (chips.length === 0) return null;

  return <ActiveFiltersBar chips={chips} clearFilters={clearFilters} />;
}
