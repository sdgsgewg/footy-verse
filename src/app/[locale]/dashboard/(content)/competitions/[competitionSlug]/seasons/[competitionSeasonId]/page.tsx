import { notFound } from "next/navigation";
import CompetitionSeasonDetailPage from "@/components/dashboard/competition-seasons/CompetitionSeasonDetailPage";
import { getCompetitionSeasonLookupService } from "@/lib/services/competitions/competition-seasons.service";
import { getCompetitionLookupService } from "@/lib/services/competitions/competitions.service";

export default async function Page({
  params,
}: {
  params: Promise<{ competitionSlug: string; competitionSeasonId: string }>;
}) {
  const { competitionSlug, competitionSeasonId } = await params;

  const competitionLookup = await getCompetitionLookupService(competitionSlug);

  const competitionSeasonLookup =
    await getCompetitionSeasonLookupService(competitionSeasonId);

  if (!competitionLookup || !competitionSeasonLookup) notFound();

  return (
    <CompetitionSeasonDetailPage
      competitionLookup={competitionLookup}
      competitionSeasonLookup={competitionSeasonLookup}
    />
  );
}
