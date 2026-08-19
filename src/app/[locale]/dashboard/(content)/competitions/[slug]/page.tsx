import CompetitionDetailPage from "@/components/competitions/CompetitionDetailPage";
import { ROUTES } from "@/constants/routes";
import { getCompetitionLookupService } from "@/lib/services/competitions.service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const competitionLookup = await getCompetitionLookupService(slug);

  if (!competitionLookup) {
    return notFound();
  }

  return (
    <CompetitionDetailPage
      competitionLookup={competitionLookup}
      returnTo={ROUTES.DASHBOARD.CONTENT.COMPETITIONS.BASE}
    />
  );
}
