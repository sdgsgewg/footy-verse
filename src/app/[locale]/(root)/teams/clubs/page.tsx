"use client";

import ActiveFiltersBar from "@/components/public/teams/clubs/ActiveFiltersBar";
import ClubFilters from "@/components/public/teams/clubs/ClubFilters";
import TeamSection from "@/components/public/teams/TeamSection";
import PageHeader from "@/components/shared/PageHeader";
import CrudPagination from "@/components/templates/crud/CrudPagination";
import PublicPageWrapper from "@/components/wrappers/PublicPageWrapper";
import { ROUTES } from "@/constants/routes";
import { useClubs } from "@/hooks/clubs";
import useClubFilter from "@/hooks/clubs/useClubFilter";
import { useCrudFilterSync } from "@/hooks/crud";
import { TeamItem } from "@/types/team";
import { useTranslations } from "next-intl";

export default function ClubsPage() {
  const t = useTranslations("public.teams");

  const {
    filters,
    debouncedFilters,
    setFilter,
    goToPage,
    changeLimit,
    syncUrl,
    clearFilters,
  } = useClubFilter();

  const isSearching = filters.search !== debouncedFilters.search;

  const { clubs, limit, totalPages, total, loading } = useClubs({
    ...debouncedFilters,
    search: debouncedFilters.search || undefined,
  });

  const modifiedClubList: TeamItem[] = clubs.map((club) => ({
    id: club.id,
    name: club.name,
    imageUrl: club.imageUrl,
    href: `${ROUTES.TEAMS.CLUBS}/${club.slug}`,
    subtitle: "",
  }));

  // Sync URL on filter
  useCrudFilterSync(debouncedFilters, syncUrl);

  return (
    <PublicPageWrapper>
      <PageHeader title={t("title")} description={t("subtitle")} />

      {/* Search and Filter */}
      <div className="flex flex-col gap-4">
        <ClubFilters
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
        title={t("clubs.title")}
        description={t("clubs.description")}
        teams={modifiedClubList}
        loading={loading}
        empty={{
          title: t("clubs.empty.title"),
          description: t("clubs.empty.description"),
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
