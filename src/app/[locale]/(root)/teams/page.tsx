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

  const tCommonStates = useTranslations("common.states");
  const tEntities = useTranslations("entities");

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
            title: tCommonStates("empty.title", {
              entity: tEntities("club").toLocaleLowerCase(),
            }),
            description: tCommonStates("empty.description", {
              entity: tEntities("club").toLocaleLowerCase(),
            }),
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
            title: tCommonStates("empty.title", {
              entity: tEntities("nationalTeam").toLocaleLowerCase(),
            }),
            description: tCommonStates("empty.description", {
              entity: tEntities("nationalTeam").toLocaleLowerCase(),
            }),
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
