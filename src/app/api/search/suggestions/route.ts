import { errorResponse, successResponse } from "@/lib/api/response";
import { getSearchSuggestionsService } from "@/lib/services/search.service";
import { searchSuggestionsQuerySchema } from "@/lib/validations/search-suggestions.schema";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const query = searchSuggestionsQuerySchema.parse({
      q: url.searchParams.get("q") ?? "",
    });

    const data = await getSearchSuggestionsService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
