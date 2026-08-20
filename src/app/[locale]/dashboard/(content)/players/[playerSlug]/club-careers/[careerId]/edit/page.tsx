import { notFound } from "next/navigation";
import EditPlayerClubCareerPage from "@/components/dashboard/player-club-careers/EditPlayerClubCareerPage";
import { getPlayerClubCareerLookupService } from "@/lib/services/player-club-careers.service";
import { getPlayerLookupService } from "@/lib/services/players.service";

export default async function Page({
  params,
}: {
  params: Promise<{ playerSlug: string; playerClubCareerId: string }>;
}) {
  const { playerSlug, playerClubCareerId } = await params;

  const playerLookup = await getPlayerLookupService(playerSlug);

  const playerClubCareerLookup =
    await getPlayerClubCareerLookupService(playerClubCareerId);

  if (!playerLookup || !playerClubCareerLookup) {
    return notFound();
  }

  return (
    <EditPlayerClubCareerPage
      playerLookup={playerLookup}
      playerClubCareerLookup={playerClubCareerLookup}
    />
  );
}
