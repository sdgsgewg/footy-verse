import EditCompetitionPage from "@/components/dashboard/competitions/EditCompetitionPage";
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

  return <EditCompetitionPage competitionLookup={competitionLookup} />;
}
