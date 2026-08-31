import { notFound } from "next/navigation";
import EditPlayerClubTeamCareerPage from "@/components/dashboard/player-club-team-careers/EditPlayerClubTeamCareerPage";
import { getPlayerClubTeamCareerLookupService } from "@/lib/services/player-club-team-careers.service";
import { getPlayerLookupService } from "@/lib/services/players.service";

export default async function Page({
  params,
}: {
  params: Promise<{ playerSlug: string; playerClubTeamCareerId: string }>;
}) {
  const { playerSlug, playerClubTeamCareerId } = await params;

  const playerLookup = await getPlayerLookupService(playerSlug);

  const playerClubTeamCareerLookup = await getPlayerClubTeamCareerLookupService(
    playerClubTeamCareerId,
  );

  if (!playerLookup || !playerClubTeamCareerLookup) {
    return notFound();
  }

  return (
    <EditPlayerClubTeamCareerPage
      playerLookup={playerLookup}
      playerClubTeamCareerLookup={playerClubTeamCareerLookup}
    />
  );
}
