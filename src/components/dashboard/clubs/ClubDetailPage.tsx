"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import ClubDetailPageLayout from "@/components/layout/detail-page/ClubDetailPageLayout";
import { useClubDetail } from "@/hooks/dashboard/clubs";
import { ClubLookupResponse } from "@/types/club";
import { useClubTeams } from "@/hooks/club-teams";
import { ClubTeamTable } from "@/components/clubs/table";
import SectionHeader from "@/components/players/sections/SectionHeader";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { useParams } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import ClubSummary from "@/components/clubs/summary/ClubSummary";

interface Props {
  clubLookup: ClubLookupResponse;
  backHref?: string;
}

const ClubDetailPage = ({ clubLookup, backHref }: Props) => {
  const { clubSlug } = useParams() as {
    clubSlug: string;
  };

  const router = useRouter();

  const tClubTeamTable = useTranslations("dashboard.clubTeams.table");

  const { club, isLoading, error, refetch } = useClubDetail(clubLookup.id);

  const { clubTeams } = useClubTeams({
    clubId: clubLookup.id,
  });

  // Initial request is still loading and no cached club data is available yet.
  if (!club && isLoading) {
    return <EntityLoading entity="club" />;
  }

  // Initial request failed before any club data could be loaded.
  if (!club && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  // Fallback: no club data is available even though loading has finished.
  if (!club) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  const handleAddClubTeam = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.CLUBS.BASE}/${clubSlug}/teams/create`,
    );
  };

  const summary = <ClubSummary summary={club} />;

  const content = (
    <>
      <section>
        <SectionHeader
          title={tClubTeamTable("title")}
          onAdd={handleAddClubTeam}
        />

        <ClubTeamTable clubTeams={clubTeams} showActions />
      </section>
    </>
  );

  const { name } = club;

  return (
    <ClubDetailPageLayout
      title={name}
      summary={summary}
      content={content}
      backHref={backHref}
    />
  );
};

export default ClubDetailPage;
