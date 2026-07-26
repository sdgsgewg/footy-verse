import { notFound } from "next/navigation";
import EditPlayerCareerPage from "@/components/dashboard/player-club-careers/EditPlayerClubCareerPage";
import { getPlayerClubCareerLookupService } from "@/lib/services/player-club-careers.service";
import { getPlayerLookupService } from "@/lib/services/players.service";

export default async function Page({
  params,
}: {
  params: Promise<{ playerSlug: string; careerId: string }>;
}) {
  const { playerSlug, careerId } = await params;

  const playerLookup = await getPlayerLookupService(playerSlug);

  const playerClubCareerLookup =
    await getPlayerClubCareerLookupService(careerId);

  if (!playerLookup || !playerClubCareerLookup) {
    return notFound();
  }

  return (
    <EditPlayerCareerPage
      playerLookup={playerLookup}
      playerClubCareerLookup={playerClubCareerLookup}
    />
  );
}
