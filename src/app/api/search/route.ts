import { errorResponse, successResponse } from "@/lib/api/response";
import { globalSearchService } from "@/lib/services/search.service";
import { getSearchQuery } from "@/lib/validations/search.schema";

export async function GET(request: Request) {
  try {
    const query = getSearchQuery(request);

    const data = await globalSearchService(query);

    return successResponse(data);
  } catch (error: unknown) {
    console.error(error);
    return errorResponse(error);
  }
}
