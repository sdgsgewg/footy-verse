import { globalSearchQuerySchema } from "@/lib/validations/search.schema";
import { searchGlobalRepo } from "@/lib/repositories/search.repo";

export async function globalSearchService(query: unknown) {
  const parsed = globalSearchQuerySchema.parse(query);

  return searchGlobalRepo(parsed);
}
