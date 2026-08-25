"use client";

import ActiveFiltersBar from "@/components/public/teams/clubs/ActiveFiltersBar";
import ClubFilters from "@/components/public/teams/clubs/ClubFilters";
import TeamSection from "@/components/public/teams/TeamSection";
import PageHeader from "@/components/shared/PageHeader";
import { PaginationSection } from "@/components/shared/pagination";
import PublicPageWrapper from "@/components/wrappers/PublicPageWrapper";
import { ROUTES } from "@/constants/routes";
import { useClubs } from "@/hooks/clubs";
import useClubFilter from "@/hooks/clubs/useClubFilter";
import { useFilterSync } from "@/hooks/filter";
import { TeamItem } from "@/types/team";
import { useTranslations } from "next-intl";

export default function ClubsPage() {
  const t = useTranslations("public.teams");

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

  const modifiedClubList: TeamItem[] = clubs.map((club) => ({
    id: club.id,
    name: club.name,
    imageUrl: club.imageUrl,
    href: `${ROUTES.TEAMS.CLUBS}/${club.slug}`,
    subtitle: "",
  }));

  // Sync URL on filter
  useFilterSync(debouncedFilters, syncUrl);

  return (
    <PublicPageWrapper>
      <PageHeader title={t("title")} description={t("subtitle")} />

      {/* Search and Filter */}
      <div className="flex flex-col gap-4">
        <ClubFilters
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

      <PaginationSection
        page={filters.page}
        totalPages={totalPages}
        onPageChange={goToPage}
        isLoading={loading}
      />
    </PublicPageWrapper>
  );
}
