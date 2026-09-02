"use client";

import EntityDataSection from "@/components/public/entities/EntityDataSection";
import { ClubActiveFiltersBar, ClubFilters } from "@/components/public/clubs";
import PageHeader from "@/components/shared/PageHeader";
import { PaginationSection } from "@/components/shared/pagination";
import { useClubs, useClubFilter } from "@/hooks/clubs";
import { useFilterSync } from "@/hooks/filter";
import { useTranslations } from "next-intl";
import { EntityItem } from "@/types/entity";
import { mapClubToEntityItem } from "@/lib/entities/mapper";

export default function Page() {
  const t = useTranslations("public.clubs");

  const tCommonStates = useTranslations("common.states");
  const tEntities = useTranslations("entities");

  const {
    filters,
    debouncedFilters,
    updateFilter,
    goToPage,
    syncUrl,
    clearFilters,
  } = useClubFilter();

  const isSearching = filters.search !== debouncedFilters.search;

  const { clubs, totalPages, loading } = useClubs({
    ...debouncedFilters,
    search: debouncedFilters.search || undefined,
  });

  const modifiedClubList: EntityItem[] = clubs.map(mapClubToEntityItem);

  // Sync URL on filter
  useFilterSync(debouncedFilters, syncUrl);

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />

      {/* Search and Filter */}
      <div className="flex flex-col gap-4">
        <ClubFilters
          filters={filters}
          updateFilter={updateFilter}
          isSearching={isSearching}
        />

        <ClubActiveFiltersBar
          filters={filters}
          updateFilter={updateFilter}
          clearFilters={clearFilters}
        />
      </div>

      <EntityDataSection
        items={modifiedClubList}
        isLoading={loading}
        empty={{
          title: tCommonStates("empty.title", {
            entity: tEntities("club").toLocaleLowerCase(),
          }),
          description: tCommonStates("empty.description", {
            entity: tEntities("club").toLocaleLowerCase(),
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
