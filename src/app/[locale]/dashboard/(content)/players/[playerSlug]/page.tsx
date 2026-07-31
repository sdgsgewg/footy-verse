import PlayerDetailPage from "@/components/players/PlayerDetailPage";
import { ROUTES } from "@/constants/routes";
import { getPlayerLookupService } from "@/lib/services/players.service";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    playerSlug: string;
  }>;

  searchParams: Promise<{
    backHref?: string;
  }>;
}

export default async function Page({ params, searchParams }: Props) {
  const { playerSlug } = await params;

  const { backHref } = await searchParams;

  const playerLookup = await getPlayerLookupService(playerSlug);

  if (!playerLookup) {
    return notFound();
  }

  return (
    <PlayerDetailPage
      playerLookup={playerLookup}
      backHref={backHref ?? ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}
    />
  );
}
