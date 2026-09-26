import EditCompetitionSeasonPage from "@/components/dashboard/competition-seasons/EditCompetitionSeasonPage";
import { getCompetitionSeasonLookupService } from "@/lib/services/competition-seasons.service";
import { getCompetitionLookupService } from "@/lib/services/competitions.service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ competitionSlug: string; competitonSeasonId: string }>;
}) {
  const { competitionSlug, competitonSeasonId } = await params;

  const competitionLookup = await getCompetitionLookupService(competitionSlug);

  const competitionSeasonLookup =
    await getCompetitionSeasonLookupService(competitonSeasonId);

  if (!competitionLookup || !competitionSeasonLookup) {
    return notFound();
  }

  return (
    <EditCompetitionSeasonPage
      competitionLookup={competitionLookup}
      competitionSeasonLookup={competitionSeasonLookup}
    />
  );
}
