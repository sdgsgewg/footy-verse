import { errorResponse, successResponse } from "@/lib/api/response";
import { getCompetitionCategoryOptionsService } from "@/lib/services/competition-categories.service";

export async function GET() {
  try {
    const data = await getCompetitionCategoryOptionsService();

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
