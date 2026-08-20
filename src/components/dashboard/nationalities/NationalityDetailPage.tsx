"use client";

import EntityLoading from "@/components/feedback/loading/EntityLoading";
import ErrorState from "@/components/feedback/ErrorState";
import { useNationalityDetail } from "@/hooks/dashboard/nationalities";
import { NationalityLookupResponse } from "@/types/nationality";
import { useNationalTeams } from "@/hooks/national-teams";
import NationalityDetailPageLayout from "@/components/layout/detail-page/NationalityDetailPageLayout";
import SectionHeader from "@/components/players/sections/SectionHeader";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";
import { NationalTeamTable } from "@/components/nationalities/table";
import NationalitySummary from "@/components/nationalities/summary/NationalitySummary";

interface Props {
  nationalityLookup: NationalityLookupResponse;
  returnTo?: string;
}

const NationalityDetailPage = ({ nationalityLookup, returnTo }: Props) => {
  const { nationSlug } = useParams() as {
    nationSlug: string;
  };

  const router = useRouter();

  const tNationalTeamTable = useTranslations("dashboard.nationalTeams.table");

  const { nationality, isLoading, error, refetch } = useNationalityDetail(
    nationalityLookup.id,
  );

  const { nationalTeams } = useNationalTeams({
    nationId: nationalityLookup.id,
  });

  // Initial request is still loading and no cached nationality data is available yet.
  if (!nationality && isLoading) {
    return <EntityLoading entity="nationality" />;
  }

  // Initial request failed before any nationality data could be loaded.
  if (!nationality && error) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  // Fallback: no nationality data is available even though loading has finished.
  if (!nationality) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  const handleAddNationalTeam = () => {
    router.push(
      `${ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE}/${nationSlug}/teams/create`,
    );
  };

  const summary = <NationalitySummary summary={nationality} />;

  const content = (
    <>
      <section>
        <SectionHeader
          title={tNationalTeamTable("title")}
          onAdd={handleAddNationalTeam}
        />
        <NationalTeamTable
          nationalityLookup={nationalityLookup}
          nationalTeams={nationalTeams}
          showActions
        />
      </section>
    </>
  );

  const { name } = nationality;

  return (
    <NationalityDetailPageLayout
      title={name}
      summary={summary}
      content={content}
      returnTo={returnTo}
    />
  );
};

export default NationalityDetailPage;
