import EditPlayerPage from "@/components/dashboard/players/EditPlayerPage";
import { getPlayerLookupService } from "@/lib/services/players.service";
import { notFound } from "next/navigation";

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

  return <EditPlayerPage playerLookup={playerLookup} />;
}
