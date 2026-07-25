"use client";

import ActiveFiltersBar from "@/components/public/teams/clubs/ActiveFiltersBar";
import ClubFilters from "@/components/public/teams/clubs/ClubFilters";
import TeamSection from "@/components/public/teams/TeamSection";
import PageHeader from "@/components/shared/PageHeader";
import PublicPageWrapper from "@/components/wrappers/PublicPageWrapper";
import { useClubs } from "@/hooks/clubs";
import useClubFilter from "@/hooks/clubs/useClubFilter";
import { useDebounce } from "@/hooks/useDebounce";
import { TeamItem } from "@/types/team";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function ClubsPage() {
  const t = useTranslations("public.teams");

  const { filters, setFilter, syncUrl, clearFilters } = useClubFilter();

  const debouncedSearch = useDebounce(filters.search, 500);

  const isSearching = filters.search !== debouncedSearch;

  const { clubs, loading } = useClubs({
    search: debouncedSearch || undefined,
    nationId: filters.nationId,
  });

  const modifiedClubList: TeamItem[] = clubs.map((club) => ({
    id: club.id,
    name: club.name,
    imageUrl: club.imageUrl,
    href: "",
    subtitle: "",
  }));

  // Sync URL on filter
  useEffect(() => {
    syncUrl({
      ...filters,
      search: debouncedSearch,
    });
  }, [debouncedSearch, filters]);

  return (
    <PublicPageWrapper>
      <PageHeader title={t("title")} description={t("subtitle")} />

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 mb-12">
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
    </PublicPageWrapper>
  );
}
