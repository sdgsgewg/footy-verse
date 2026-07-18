"use client";

import TeamSearch from "@/components/public/teams/TeamSearch";
import TeamSection from "@/components/public/teams/TeamSection";
import PageHeader from "@/components/shared/PageHeader";
import PublicPageWrapper from "@/components/wrappers/PublicPageWrapper";
import { useClubs } from "@/hooks/dashboard/clubs";
import { useDebounce } from "@/hooks/useDebounce";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { TeamItem } from "@/types/team";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function TeamsPage() {
  const t = useTranslations("public.teams");

  const [nationId, setNationId] = useState("");
  const [clubType, setClubType] = useState("");
  const [keyword, setKeyword] = useState("");

  const debouncedKeyword = useDebounce(keyword, 500);

  const { clubs, loading } = useClubs({
    name: debouncedKeyword || undefined,
    nationId: nationId || undefined,
    clubType: clubType || undefined,
  });

  const modifiedClubList: TeamItem[] = clubs.map((club) => ({
    id: club.id,
    name: club.name,
    imageUrl: getImageUrl(STORAGE_BUCKETS.CLUBS, club.image),
    href: "",
    subtitle: "",
  }));

  return (
    <PublicPageWrapper>
      <PageHeader title={t("title")} description={t("subtitle")} />

      {/* <TeamSearch
        value={keyword}
        onChange={setKeyword}
        placeholder="Search club teams..."
      /> */}

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 mb-12">
        {/* <PortfolioFilters
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
          tProjectValues={tProjectValues}
          tCommon={tCommon}
        /> */}
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
      />
    </PublicPageWrapper>
  );
}
