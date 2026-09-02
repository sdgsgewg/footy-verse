import { globalSearchQuerySchema } from "@/lib/validations/search.schema";
import {
  getSearchSuggestionsRepo,
  searchGlobalRepo,
} from "@/lib/repositories/search.repo";
import { searchSuggestionsQuerySchema } from "../validations/search-suggestions.schema";

export async function globalSearchService(query: unknown) {
  const parsed = globalSearchQuerySchema.parse(query);

  return searchGlobalRepo(parsed);
}

export async function getSearchSuggestionsService(query: unknown) {
  const parsed = searchSuggestionsQuerySchema.parse(query);

  return getSearchSuggestionsRepo(parsed);
}
