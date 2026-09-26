import CompetitionDetailPage from "@/components/competitions/CompetitionDetailPage";
import { ENTITY_CONFIG } from "@/config/entities";
import { getCompetitionLookupService } from "@/lib/services/competitions.service";
import { notFound } from "next/navigation";

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

  return (
    <CompetitionDetailPage
      competitionLookup={competitionLookup}
      returnTo={ENTITY_CONFIG["competition"]["dashboardRoute"]}
    />
  );
}
