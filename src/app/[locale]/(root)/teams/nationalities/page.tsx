"use client";

import ActiveFiltersBar from "@/components/public/teams/nationalities/ActiveFiltersBar";
import NationalityFilters from "@/components/public/teams/nationalities/NationalityFilters";
import TeamSection from "@/components/public/teams/TeamSection";
import PageHeader from "@/components/shared/PageHeader";
import PublicPageWrapper from "@/components/wrappers/PublicPageWrapper";
import { ROUTES } from "@/constants/routes";
import { useNationalities } from "@/hooks/nationalities";
import useNationalityFilter from "@/hooks/nationalities/useNationalityFilter";
import { useDebounce } from "@/hooks/useDebounce";
import { TeamItem } from "@/types/team";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function TeamsPage() {
  const t = useTranslations("public.teams");

  const { filters, setFilter, syncUrl, clearFilters } = useNationalityFilter();

  const debouncedSearch = useDebounce(filters.search, 500);

  const isSearching = filters.search !== debouncedSearch;

  const { nationalities, loading } = useNationalities({
    search: debouncedSearch || undefined,
  });

  const modifiedNationalityList: TeamItem[] = nationalities.map((nation) => ({
    id: nation.id,
    name: nation.name,
    imageUrl: nation.imageUrl,
    href: `${ROUTES.TEAMS.NATIONALITIES}/${nation.slug}`,
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
    </PublicPageWrapper>
  );
}
