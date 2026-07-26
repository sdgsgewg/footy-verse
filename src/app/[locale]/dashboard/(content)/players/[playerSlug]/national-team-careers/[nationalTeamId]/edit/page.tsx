import { notFound } from "next/navigation";
import { getPlayerLookupService } from "@/lib/services/players.service";
import EditPlayerNationalTeamPage from "@/components/dashboard/player-national-team-careers/EditPlayerNationalTeamCareerPage";
import { getPlayerNationalTeamCareerLookupService } from "@/lib/services/player-national-team-careers.service";

export default async function Page({
  params,
}: {
  params: Promise<{ playerSlug: string; nationalTeamId: string }>;
}) {
  const { playerSlug, nationalTeamId } = await params;

  const playerLookup = await getPlayerLookupService(playerSlug);

  const playerNationalTeamLookup =
    await getPlayerNationalTeamCareerLookupService(nationalTeamId);

  if (!playerLookup || !playerNationalTeamLookup) {
    return notFound();
  }

  return (
    <EditPlayerNationalTeamPage
      playerLookup={playerLookup}
      playerNationalTeamLookup={playerNationalTeamLookup}
    />
  );
}
