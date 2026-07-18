"use client";

import TeamSearch from "@/components/public/teams/TeamSearch";
import TeamSection from "@/components/public/teams/TeamSection";
import PageHeader from "@/components/shared/PageHeader";
import PublicPageWrapper from "@/components/wrappers/PublicPageWrapper";
import { ROUTES } from "@/constants/routes";
import { useNationalities } from "@/hooks/dashboard/nationalities";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { useRouter } from "@/navigation";
import { TeamItem } from "@/types/team";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function TeamsPage() {
  const t = useTranslations("public.teams");

  const router = useRouter();

  const { nationalities, loading: isNationalTeamLoading } = useNationalities();

  const [keyword, setKeyword] = useState("");

  const modifiedNationalTeamList: TeamItem[] = nationalities.map((nation) => ({
    id: nation.id,
    name: nation.name,
    imageUrl: getImageUrl(STORAGE_BUCKETS.NATIONALITIES, nation.image),
    href: "",
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
    </PublicPageWrapper>
  );
}
