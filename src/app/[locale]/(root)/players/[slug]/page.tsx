import PlayerDetailPage from "@/components/players/PlayerDetailPage";
import { getPlayerLookupService } from "@/lib/services/players.service";
import { notFound } from "next/navigation";

export default async function ViewPlayerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const playerLookup = await getPlayerLookupService(slug);

  if (!playerLookup) {
    return notFound();
  }

  return <PlayerDetailPage playerLookup={playerLookup} />;
}
