import { notFound } from "next/navigation";
import CreateCompetitionSeasonPage from "@/components/dashboard/competition-seasons/CreateCompetitionSeasonPage";
import { getCompetitionLookupService } from "@/lib/services/competitions.service";

export default async function Page({
  params,
}: {
  params: Promise<{ competitionSlug: string }>;
}) {
  const { competitionSlug } = await params;

  const competitionLookup = await getCompetitionLookupService(competitionSlug);

  if (!competitionLookup) {
    return notFound();
  }

  return <CreateCompetitionSeasonPage competitionLookup={competitionLookup} />;
}
