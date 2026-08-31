import { errorResponse, successResponse } from "@/lib/api/response";
import { getPositionOptionsService } from "@/lib/services/positions.service";

export async function GET() {
  try {
    const data = await getPositionOptionsService();

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
