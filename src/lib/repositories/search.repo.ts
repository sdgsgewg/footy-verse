import { searchPlayersRepo } from "./players.repo";
import { searchClubsRepo } from "./clubs.repo";
import { searchCompetitionsRepo } from "./competitions.repo";
import { searchNationalitiesRepo } from "./nationalities.repo";
import { GlobalSearchResponse } from "@/types/search";

export async function searchGlobalRepo({
  q,
}: {
  q: string;
}): Promise<GlobalSearchResponse> {
  const limit = 5;

  const [players, clubs, competitions, nationalities] = await Promise.all([
    searchPlayersRepo(q, limit),
    searchClubsRepo(q, limit),
    searchCompetitionsRepo(q, limit),
    searchNationalitiesRepo(q, limit),
  ]);

  const groups = [
    {
      type: "player" as const,
      total: players.length,
      results: players,
    },
    {
      type: "club" as const,
      total: clubs.length,
      results: clubs,
    },
    {
      type: "nationality" as const,
      total: nationalities.length,
      results: nationalities,
    },
    {
      type: "competition" as const,
      total: competitions.length,
      results: competitions,
    },
  ].filter((group) => group.results.length > 0);

  return {
    query: q,
    total: groups.reduce((total, group) => total + group.results.length, 0),
    groups,
  };
}
