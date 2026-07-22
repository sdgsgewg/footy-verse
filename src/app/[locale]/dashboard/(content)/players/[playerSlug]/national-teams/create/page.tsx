import { notFound } from "next/navigation";
import { getPlayerLookupService } from "@/lib/services/players.service";
import CreatePlayerNationalTeamPage from "@/components/dashboard/player-national-teams/CreatePlayerNationalTeamPage";

export default async function Page({
  params,
}: {
  params: Promise<{ playerSlug: string }>;
}) {
  const { playerSlug } = await params;

  const playerLookup = await getPlayerLookupService(playerSlug);

  if (!playerLookup) {
    return notFound();
  }

  return <CreatePlayerNationalTeamPage playerLookup={playerLookup} />;
}
