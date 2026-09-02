"use client";

import EntityDataSection from "@/components/public/entities/EntityDataSection";
import {
  ActiveFiltersBar,
  NationalityFilters,
} from "@/components/public/nationalities";
import PageHeader from "@/components/shared/PageHeader";
import { PaginationSection } from "@/components/shared/pagination";
import { ROUTES } from "@/constants/routes";
import { useFilterSync } from "@/hooks/filter";
import { useNationalities, useNationalityFilter } from "@/hooks/nationalities";
import { EntityItem } from "@/types/entity";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("public.nationalities");

  const {
    filters,
    debouncedFilters,
    updateFilter,
    goToPage,
    syncUrl,
    clearFilters,
  } = useNationalityFilter();

  const isSearching = filters.search !== debouncedFilters.search;

  const { nationalities, totalPages, loading } = useNationalities({
    ...debouncedFilters,
    search: debouncedFilters.search || undefined,
  });

  const modifiedNationalityList: EntityItem[] = nationalities.map((nation) => ({
    id: nation.id,
    name: nation.name,
    imageUrl: nation.imageUrl,
    href: `${ROUTES.NATIONALITIES}/${nation.slug}`,
    subtitle: "",
  }));

  // Sync URL on filter
  useFilterSync(debouncedFilters, syncUrl);

  return (
    <>
      <PageHeader title={t("title")} description={t("description")} />

      {/* Search and Filter */}
      <div className="flex flex-col gap-4">
        <NationalityFilters
          filters={filters}
          updateFilter={updateFilter}
          isSearching={isSearching}
        />

        <ActiveFiltersBar
          filters={filters}
          updateFilter={updateFilter}
          clearFilters={clearFilters}
        />
      </div>

      <EntityDataSection
        items={modifiedNationalityList}
        isLoading={loading}
        empty={{
          title: t("empty.title"),
          description: t("empty.description"),
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
