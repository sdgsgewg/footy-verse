import { errorResponse, successResponse } from "@/lib/api/response";
import { getRegionOptionsService } from "@/lib/services/regions.service";

export async function GET() {
  try {
    const data = await getRegionOptionsService();

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
