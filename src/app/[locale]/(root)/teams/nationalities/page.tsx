"use client";

import ActiveFiltersBar from "@/components/public/teams/nationalities/ActiveFiltersBar";
import NationalityFilters from "@/components/public/teams/nationalities/NationalityFilters";
import TeamSection from "@/components/public/teams/TeamSection";
import PageHeader from "@/components/shared/PageHeader";
import { PaginationSection } from "@/components/shared/pagination";
import PublicPageWrapper from "@/components/wrappers/PublicPageWrapper";
import { ROUTES } from "@/constants/routes";
import { useCrudFilterSync } from "@/hooks/crud";
import { useNationalities } from "@/hooks/nationalities";
import useNationalityFilter from "@/hooks/nationalities/useNationalityFilter";
import { TeamItem } from "@/types/team";
import { useTranslations } from "next-intl";

export default function TeamsPage() {
  const t = useTranslations("public.teams");

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

  const modifiedNationalityList: TeamItem[] = nationalities.map((nation) => ({
    id: nation.id,
    name: nation.name,
    imageUrl: nation.imageUrl,
    href: `${ROUTES.TEAMS.NATIONALITIES}/${nation.slug}`,
    subtitle: "",
  }));

  // Sync URL on filter
  useCrudFilterSync(debouncedFilters, syncUrl);

  return (
    <PublicPageWrapper>
      <PageHeader title={t("title")} description={t("subtitle")} />

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

      <TeamSection
        title={t("nationalTeams.title")}
        description={t("nationalTeams.description")}
        teams={modifiedNationalityList}
        loading={loading}
        empty={{
          title: t("nationalTeams.empty.title"),
          description: t("nationalTeams.empty.description"),
        }}
        showAllData
      />

      <PaginationSection
        page={filters.page}
        totalPages={totalPages}
        onPageChange={goToPage}
        isLoading={loading}
      />
    </PublicPageWrapper>
  );
}
