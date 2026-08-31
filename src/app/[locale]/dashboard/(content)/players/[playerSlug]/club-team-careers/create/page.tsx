import { notFound } from "next/navigation";
import { getPlayerLookupService } from "@/lib/services/players.service";
import CreatePlayerClubTeamCareerPage from "@/components/dashboard/player-club-team-careers/CreatePlayerClubTeamCareerPage";

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

  return <CreatePlayerClubTeamCareerPage playerLookup={playerLookup} />;
}
