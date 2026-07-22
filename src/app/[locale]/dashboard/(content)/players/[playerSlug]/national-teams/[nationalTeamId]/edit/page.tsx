import { notFound } from "next/navigation";
import { getPlayerLookupService } from "@/lib/services/players.service";
import EditPlayerNationalTeamPage from "@/components/dashboard/player-national-teams/EditPlayerNationalTeamPage";
import { getPlayerNationalTeamLookupService } from "@/lib/services/player-national-teams.service";

export default async function Page({
  params,
}: {
  params: Promise<{ playerSlug: string; nationalTeamId: string }>;
}) {
  const { playerSlug, nationalTeamId } = await params;

  const playerLookup = await getPlayerLookupService(playerSlug);

  const playerNationalTeamLookup =
    await getPlayerNationalTeamLookupService(nationalTeamId);

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
