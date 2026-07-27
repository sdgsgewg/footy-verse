import { notFound } from "next/navigation";
import { getPlayerLookupService } from "@/lib/services/players.service";
import CreatePlayerClubCareerPage from "@/components/dashboard/player-club-careers/CreatePlayerClubCareerPage";

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

  return <CreatePlayerClubCareerPage playerLookup={playerLookup} />;
}
