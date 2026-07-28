import PlayerDetailPage from "@/components/players/PlayerDetailPage";
import { ROUTES } from "@/constants/routes";
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

  return (
    <PlayerDetailPage
      playerLookup={playerLookup}
      backHref={ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}
    />
  );
}
