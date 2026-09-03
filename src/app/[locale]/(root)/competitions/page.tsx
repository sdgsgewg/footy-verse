"use client";

import EntityDataSection from "@/components/public/entities/EntityDataSection";
import PageHeader from "@/components/shared/PageHeader";
import { PaginationSection } from "@/components/shared/pagination";
import { useFilterSync } from "@/hooks/filter";
import { useTranslations } from "next-intl";
import { EntityItem } from "@/types/entity";
import { useCompetitionFilter, useCompetitions } from "@/hooks/competitions";
import CompetitionFilters from "@/components/public/competitions/CompetitionFilters";
import CompetitionActiveFiltersBar from "@/components/public/competitions/CompetitionActiveFiltersBar";
import { mapCompetitionToEntityItem } from "@/lib/entities/mapper";

export default function Page() {
  const t = useTranslations("public.competitions");

  const tCommonStates = useTranslations("common.states");
  const tEntities = useTranslations("entities");

  const {
    filters,
    debouncedFilters,
    updateFilter,
    goToPage,
    syncUrl,
    clearFilters,
  } = useCompetitionFilter();

  const isSearching = filters.search !== debouncedFilters.search;

  const { competitions, totalPages, loading } = useCompetitions({
    ...debouncedFilters,
    search: debouncedFilters.search || undefined,
  });

  const modifiedcompetitionList: EntityItem[] = competitions.map(
    mapCompetitionToEntityItem,
  );

  // Sync URL on filter
  useFilterSync(debouncedFilters, syncUrl);

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />

      {/* Search and Filter */}
      <div className="flex flex-col gap-4">
        <CompetitionFilters
          filters={filters}
          updateFilter={updateFilter}
          isSearching={isSearching}
        />

        <CompetitionActiveFiltersBar
          filters={filters}
          updateFilter={updateFilter}
          clearFilters={clearFilters}
        />
      </div>

      <EntityDataSection
        items={modifiedcompetitionList}
        isLoading={loading}
        empty={{
          title: tCommonStates("empty.title", {
            entity: tEntities("competition").toLocaleLowerCase(),
          }),
          description: tCommonStates("empty.description", {
            entity: tEntities("competition").toLocaleLowerCase(),
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
