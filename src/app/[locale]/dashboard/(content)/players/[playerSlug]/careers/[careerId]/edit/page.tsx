import { notFound } from "next/navigation";
import EditPlayerCareerPage from "@/components/dashboard/player-careers/EditPlayerCareerPage";
import { getPlayerCareerLookupService } from "@/lib/services/player-careers.service";
import { getPlayerLookupService } from "@/lib/services/players.service";

export default async function Page({
  params,
}: {
  params: Promise<{ playerSlug: string; careerId: string }>;
}) {
  const { playerSlug, careerId } = await params;

  const playerLookup = await getPlayerLookupService(playerSlug);

  const playerCareerLookup = await getPlayerCareerLookupService(careerId);

  if (!playerLookup || !playerCareerLookup) {
    return notFound();
  }

  return (
    <EditPlayerCareerPage
      playerLookup={playerLookup}
      playerCareerLookup={playerCareerLookup}
    />
  );
}
