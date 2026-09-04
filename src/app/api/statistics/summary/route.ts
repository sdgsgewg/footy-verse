import { errorResponse, successResponse } from "@/lib/api/response";
import { getHomeStatisticsService } from "@/lib/services/statistics.service";

export async function GET() {
  try {
    const data = await getHomeStatisticsService();

    return successResponse(data);
  } catch (error: unknown) {
    console.error(error);

    return errorResponse(error);
  }
}
