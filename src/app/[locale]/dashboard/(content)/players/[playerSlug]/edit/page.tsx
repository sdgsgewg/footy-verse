import EditPlayerPage from "@/components/dashboard/players/EditPlayerPage";
import { ROUTES } from "@/constants/routes";
import { getPlayerLookupService } from "@/lib/services/players.service";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    playerSlug: string;
  }>;

  searchParams: Promise<{
    returnTo?: string;
  }>;
}

export default async function Page({ params, searchParams }: Props) {
  const { playerSlug } = await params;

  const { returnTo } = await searchParams;

  const playerLookup = await getPlayerLookupService(playerSlug);

  if (!playerLookup) {
    return notFound();
  }

  return (
    <EditPlayerPage
      playerLookup={playerLookup}
      redirectTo={returnTo ?? ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}
    />
  );
}
