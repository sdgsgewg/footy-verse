import { searchPlayersRepo } from "./players.repo";
import { searchClubsRepo } from "./clubs.repo";
import { searchCompetitionsRepo } from "./competitions.repo";
import { searchNationalitiesRepo } from "./nationalities.repo";
import { GlobalSearchResponse, SearchSuggestionsResponse } from "@/types/search";
import { SearchSuggestionsQuery } from "../validations/search-suggestions.schema";

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

export async function getSearchSuggestionsRepo(
  params: SearchSuggestionsQuery,
): Promise<SearchSuggestionsResponse> {
  const limit = 5;

  const [players, clubs, competitions, nationalities] = await Promise.all([
    searchPlayersRepo(params.q, limit),
    searchClubsRepo(params.q, limit),
    searchCompetitionsRepo(params.q, limit),
    searchNationalitiesRepo(params.q, limit),
  ]);

  const groups = [
    {
      type: "player" as const,
      results: players,
    },
    {
      type: "club" as const,
      results: clubs,
    },
    {
      type: "competition" as const,
      results: competitions,
    },
    {
      type: "nationality" as const,
      results: nationalities,
    },
  ].filter((group) => group.results.length > 0);

  return {
    query: params.q,
    groups,
  };
}
