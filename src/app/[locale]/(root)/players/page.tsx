"use client";

import EntityDataSection from "@/components/public/entities/EntityDataSection";
import PageHeader from "@/components/shared/PageHeader";
import { PaginationSection } from "@/components/shared/pagination";
import { useFilterSync } from "@/hooks/filter";
import { useTranslations } from "next-intl";
import { EntityItem } from "@/types/entity";
import usePlayerFilter from "@/hooks/players/usePlayerFilter";
import { usePlayers } from "@/hooks/dashboard/players";
import { mapPlayerToEntityItem } from "@/lib/entities/mapper";
import {
  PlayerActiveFiltersBar,
  PlayerFilters,
} from "@/components/public/players";

export default function Page() {
  const t = useTranslations("public.players");

  const tCommonStates = useTranslations("common.states");
  const tEntities = useTranslations("entities");

  const {
    filters,
    debouncedFilters,
    updateFilter,
    goToPage,
    syncUrl,
    clearFilters,
  } = usePlayerFilter();

  const isSearching = filters.search !== debouncedFilters.search;

  const { players, totalPages, loading } = usePlayers({
    ...debouncedFilters,
    search: debouncedFilters.search || undefined,
  });

  const modifiedPlayerList: EntityItem[] = players.map(mapPlayerToEntityItem);

  // Sync URL on filter
  useFilterSync(debouncedFilters, syncUrl);

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />

      {/* Search and Filter */}
      <div className="flex flex-col gap-4">
        <PlayerFilters
          filters={filters}
          updateFilter={updateFilter}
          isSearching={isSearching}
        />

        <PlayerActiveFiltersBar
          filters={filters}
          updateFilter={updateFilter}
          clearFilters={clearFilters}
        />
      </div>

      <EntityDataSection
        items={modifiedPlayerList}
        isLoading={loading}
        empty={{
          title: tCommonStates("empty.title", {
            entity: tEntities("player").toLocaleLowerCase(),
          }),
          description: tCommonStates("empty.description", {
            entity: tEntities("player").toLocaleLowerCase(),
          }),
        }}
        showAllData
      />

      <PaginationSection
        page={filters.page}
        totalPages={totalPages}
        onPageChange={goToPage}
        isLoading={loading}
      />
    </>
  );
}
