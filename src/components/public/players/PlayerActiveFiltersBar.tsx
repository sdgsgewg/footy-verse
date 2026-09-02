"use client";

import { useMemo } from "react";
import { ActiveFiltersBar } from "@/components/shared/filter";
import { PlayerFilter } from "@/types/player";
import { usePlayerFilterOptions } from "@/hooks/players";

interface Props {
  filters: PlayerFilter;

  updateFilter: <K extends keyof PlayerFilter>(
    key: K,
    value: PlayerFilter[K],
  ) => void;

  clearFilters: () => void;
}

export default function PlayerActiveFiltersBar({
  filters,
  updateFilter,
  clearFilters,
}: Props) {
  const { positionOptions, nationalityOptions, clubTeamOptions } =
    usePlayerFilterOptions();

  const positionMap = useMemo(() => {
    return new Map(
      positionOptions.map((position) => [position.value, position.label]),
    );
  }, [positionOptions]);

  const nationMap = useMemo(() => {
    return new Map(
      nationalityOptions.map((nation) => [nation.value, nation.label]),
    );
  }, [nationalityOptions]);

  const clubTeamMap = useMemo(() => {
    return new Map(clubTeamOptions.map((ct) => [ct.value, ct.label]));
  }, [clubTeamOptions]);

  const chips = [];

  if (filters.search) {
    chips.push({
      key: "search",
      label: `Search: ${filters.search}`,
      onRemove: () => updateFilter("search", ""),
    });
  }

  if (filters.positionId) {
    chips.push({
      key: "position",
      label: positionMap.get(filters.positionId) ?? filters.positionId,
      onRemove: () => updateFilter("positionId", undefined),
    });
  }

  if (filters.nationId) {
    chips.push({
      key: "nation",
      label: nationMap.get(filters.nationId) ?? filters.nationId,
      onRemove: () => updateFilter("nationId", undefined),
    });
  }

  if (filters.clubTeamId) {
    chips.push({
      key: "clubTeam",
      label: clubTeamMap.get(filters.clubTeamId) ?? filters.clubTeamId,
      onRemove: () => updateFilter("clubTeamId", undefined),
    });
  }

  if (chips.length === 0) return null;

  return <ActiveFiltersBar chips={chips} clearFilters={clearFilters} />;
}
