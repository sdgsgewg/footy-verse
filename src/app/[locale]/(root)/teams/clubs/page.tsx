"use client";

import ActiveFiltersBar from "@/components/public/teams/clubs/ActiveFiltersBar";
import ClubFilters from "@/components/public/teams/clubs/ClubFilters";
import TeamSection from "@/components/public/teams/TeamSection";
import PageHeader from "@/components/shared/PageHeader";
import PublicPageWrapper from "@/components/wrappers/PublicPageWrapper";
import { useClubs } from "@/hooks/clubs";
import useClubFilter, { ClubFilter } from "@/hooks/clubs/useClubFilter";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "@/navigation";
import { TeamItem } from "@/types/team";
import { useTranslations } from "next-intl";

export default function ClubsPage() {
  const t = useTranslations("public.teams");
  const router = useRouter();

  const { filters, setFilters, isSearching, clearFilters } = useClubFilter();

  const debouncedKeyword = useDebounce(filters.name, 500);

  const { clubs, loading } = useClubs({
    name: debouncedKeyword || undefined,
    nationId: filters.nationId || undefined,
    clubType: filters.clubType || undefined,
  });

  const modifiedClubList: TeamItem[] = clubs.map((club) => ({
    id: club.id,
    name: club.name,
    imageUrl: club.imageUrl,
    href: "",
    subtitle: "",
  }));

  const updateQuery = (newFilters: ClubFilter) => {
    const params = new URLSearchParams();

    if (newFilters.sort) params.set("sort", newFilters.sort);
    if (newFilters.name) params.set("name", newFilters.name);
    if (newFilters.nationId) params.set("nationId", newFilters.nationId);
    if (newFilters.clubType) params.set("clubType", newFilters.clubType);

    router.push(`?${params.toString()}`);
  };

  return (
    <PublicPageWrapper>
      <PageHeader title={t("title")} description={t("subtitle")} />

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 mb-12">
        <ClubFilters
          filters={filters}
          setFilters={setFilters}
          updateQuery={updateQuery}
          isSearching={isSearching}
        />

        <ActiveFiltersBar
          filters={filters}
          setFilters={(updater) =>
            setFilters((prev) => {
              const updated =
                typeof updater === "function" ? updater(prev) : updater;

              updateQuery(updated);
              return updated;
            })
          }
          onClearAll={clearFilters}
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
