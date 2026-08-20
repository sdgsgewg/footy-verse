import { notFound } from "next/navigation";
import { getPlayerLookupService } from "@/lib/services/players.service";
import EditPlayerNationalTeamCareerPage from "@/components/dashboard/player-national-team-careers/EditPlayerNationalTeamCareerPage";
import { getPlayerNationalTeamCareerLookupService } from "@/lib/services/player-national-team-careers.service";

export default async function Page({
  params,
}: {
  params: Promise<{ playerSlug: string; playerNationalTeamCareerId: string }>;
}) {
  const { playerSlug, playerNationalTeamCareerId } = await params;

  const playerLookup = await getPlayerLookupService(playerSlug);

  const playerNationalTeamLookup =
    await getPlayerNationalTeamCareerLookupService(playerNationalTeamCareerId);

  if (!playerLookup || !playerNationalTeamLookup) {
    return notFound();
  }

  return (
    <EditPlayerNationalTeamCareerPage
      playerLookup={playerLookup}
      playerNationalTeamLookup={playerNationalTeamLookup}
    />
  );
}
