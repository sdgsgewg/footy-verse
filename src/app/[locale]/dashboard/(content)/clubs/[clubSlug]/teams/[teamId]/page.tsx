import ClubTeamDetailPage from "@/components/dashboard/club-teams/ClubTeamDetailPage";
import { ROUTES } from "@/constants/routes";
import { getClubTeamLookupService } from "@/lib/services/club-teams.service";
import { getClubLookupService } from "@/lib/services/clubs.service";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ clubSlug: string; teamId: string }>;
}) {
  const { clubSlug, teamId } = await params;

  const clubLookup = await getClubLookupService(clubSlug);
  const clubTeamLookup = await getClubTeamLookupService(teamId);

  if (!clubLookup || !clubTeamLookup) {
    return notFound();
  }

  const returnTo = `${ROUTES.DASHBOARD.CONTENT.CLUBS.BASE}/${clubLookup.slug}/teams/${clubTeamLookup.id}`;

  return (
    <ClubTeamDetailPage
      clubLookup={clubLookup}
      clubTeamLookup={clubTeamLookup}
      returnTo={returnTo}
    />
  );
}
