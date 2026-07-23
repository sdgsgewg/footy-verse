import EditNationalTeamPage from "@/components/dashboard/national-teams/EditNationalTeamPage";
import { getNationalTeamLookupService } from "@/lib/services/national-teams.service";
import { getNationalityLookupService } from "@/lib/services/nationalities.service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ nationSlug: string; teamId: string }>;
}) {
  const { nationSlug, teamId } = await params;

  const nationLookup = await getNationalityLookupService(nationSlug);

  const nationalTeamLookup = await getNationalTeamLookupService(teamId);

  if (!nationLookup || !nationalTeamLookup) {
    return notFound();
  }

  return (
    <EditNationalTeamPage
      nationLookup={nationLookup}
      nationalTeamLookup={nationalTeamLookup}
    />
  );
}
