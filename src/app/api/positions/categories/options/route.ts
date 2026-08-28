import { errorResponse, successResponse } from "@/lib/api/response";
import { getPositionCategoryOptionsService } from "@/lib/services/position-categories.service";

export async function GET() {
  try {
    const data = await getPositionCategoryOptionsService();

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
