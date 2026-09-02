"use client";

import TeamSection from "@/components/public/teams/TeamSection";
import PageHeader from "@/components/shared/PageHeader";
import { ROUTES } from "@/constants/routes";
import { useClubs } from "@/hooks/clubs";
import { useNationalities } from "@/hooks/nationalities";
import { useRouter } from "@/navigation";
import { TeamItem } from "@/types/team";
import { useTranslations } from "next-intl";

export default function TeamsPage() {
  const tTeams = useTranslations("public.teams");
  const tClubs = useTranslations("public.clubs");
  const tNationalities = useTranslations("public.nationalities");

  const router = useRouter();

  const { clubs, loading: isClubLoading } = useClubs();
  const { nationalities, loading: isNationalTeamLoading } = useNationalities();

  const modifiedClubList: TeamItem[] = clubs.map((club) => ({
    id: club.id,
    name: club.name,
    imageUrl: club.imageUrl,
    href: `${ROUTES.CLUBS}/${club.slug}`,
    subtitle: "",
  }));

  const modifiedNationalityList: TeamItem[] = nationalities.map((nation) => ({
    id: nation.id,
    name: nation.name,
    imageUrl: nation.imageUrl,
    href: `${ROUTES.NATIONALITIES}/${nation.slug}`,
    subtitle: "",
  }));

  return (
    <>
      <PageHeader title={tTeams("title")} description={tTeams("subtitle")} />

      <div className="space-y-14">
        <TeamSection
          title={tClubs("title")}
          description={tClubs("description")}
          teams={modifiedClubList}
          loading={isClubLoading}
          empty={{
            title: tClubs("empty.title"),
            description: tClubs("empty.description"),
          }}
          showMore={{
            visible: modifiedClubList.length >= 10,
            onClick: () => router.push(ROUTES.CLUBS),
          }}
        />

        <TeamSection
          title={tNationalities("title")}
          description={tNationalities("description")}
          teams={modifiedNationalityList}
          loading={isNationalTeamLoading}
          empty={{
            title: tNationalities("empty.title"),
            description: tNationalities("empty.description"),
          }}
          showMore={{
            visible: modifiedNationalityList.length >= 10,
            onClick: () => router.push(ROUTES.NATIONALITIES),
          }}
        />
      </div>
    </>
  );
}
