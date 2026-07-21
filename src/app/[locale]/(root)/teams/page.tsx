"use client";

import TeamSearch from "@/components/public/teams/TeamSearch";
import TeamSection from "@/components/public/teams/TeamSection";
import PageHeader from "@/components/shared/PageHeader";
import PublicPageWrapper from "@/components/wrappers/PublicPageWrapper";
import { ROUTES } from "@/constants/routes";
import { useClubs } from "@/hooks/clubs";
import { useNationalities } from "@/hooks/dashboard/nationalities";
import { useRouter } from "@/navigation";
import { TeamItem } from "@/types/team";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function TeamsPage() {
  const t = useTranslations("public.teams");

  const router = useRouter();

  const { clubs, loading: isClubLoading } = useClubs();
  const { nationalities, loading: isNationalTeamLoading } = useNationalities();

  const [keyword, setKeyword] = useState("");

  const modifiedClubList: TeamItem[] = clubs.map((club) => ({
    id: club.id,
    name: club.name,
    imageUrl: club.imageUrl,
    href: `${ROUTES.TEAMS.CLUBS}/${club.slug}`,
    subtitle: "",
  }));

  const modifiedNationalTeamList: TeamItem[] = nationalities.map((nation) => ({
    id: nation.id,
    name: nation.name,
    imageUrl: nation.imageUrl,
    href: `${ROUTES.TEAMS.NATIONAL_TEAMS}/${nation.slug}`,
    subtitle: "",
  }));

  return (
    <PublicPageWrapper>
      <PageHeader title={t("title")} description={t("subtitle")} />

      <TeamSearch
        value={keyword}
        onChange={setKeyword}
        placeholder="Search teams..."
      />

      <div className="space-y-14">
        <TeamSection
          title={t("clubs.title")}
          description={t("clubs.description")}
          teams={modifiedClubList}
          loading={isClubLoading}
          empty={{
            title: t("clubs.empty.title"),
            description: t("clubs.empty.description"),
          }}
          showMore={{
            visible: modifiedClubList.length >= 10,
            onClick: () => router.push(ROUTES.TEAMS.CLUBS),
          }}
        />

        <TeamSection
          title={t("nationalTeams.title")}
          description={t("nationalTeams.description")}
          teams={modifiedNationalTeamList}
          loading={isNationalTeamLoading}
          empty={{
            title: t("nationalTeams.empty.title"),
            description: t("nationalTeams.empty.description"),
          }}
          showMore={{
            visible: modifiedNationalTeamList.length >= 10,
            onClick: () => router.push(ROUTES.TEAMS.NATIONAL_TEAMS),
          }}
        />
      </div>
    </PublicPageWrapper>
  );
}
