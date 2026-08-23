"use client";

import ActiveFiltersBar from "@/components/public/teams/nationalities/ActiveFiltersBar";
import NationalityFilters from "@/components/public/teams/nationalities/NationalityFilters";
import TeamSection from "@/components/public/teams/TeamSection";
import PageHeader from "@/components/shared/PageHeader";
import CrudPagination from "@/components/templates/crud/CrudPagination";
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
    setFilter,
    goToPage,
    changeLimit,
    syncUrl,
    clearFilters,
  } = useNationalityFilter();

  const isSearching = filters.search !== debouncedFilters.search;

  const { nationalities, limit, totalPages, total, loading } = useNationalities(
    {
      ...debouncedFilters,
      search: debouncedFilters.search || undefined,
    },
  );

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
          setFilter={setFilter}
          isSearching={isSearching}
        />

        <ActiveFiltersBar
          filters={filters}
          setFilter={setFilter}
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

      <CrudPagination
        page={filters.page}
        limit={limit}
        totalPages={totalPages}
        totalItems={total}
        loading={loading}
        onPageChange={goToPage}
        onLimitChange={changeLimit}
      />
    </PublicPageWrapper>
  );
}
