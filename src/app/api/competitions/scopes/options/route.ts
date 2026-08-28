import { errorResponse, successResponse } from "@/lib/api/response";
import { getCompetitionScopeOptionsService } from "@/lib/services/competition-scopes.service";

export async function GET() {
  try {
    const data = await getCompetitionScopeOptionsService();

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
