import { notFound } from "next/navigation";
import { getPlayerLookupService } from "@/lib/services/players.service";
import CreatePlayerCareerPage from "@/components/dashboard/player-careers/CreatePlayerCareerPage";

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

  return <CreatePlayerCareerPage playerLookup={playerLookup} />;
}
