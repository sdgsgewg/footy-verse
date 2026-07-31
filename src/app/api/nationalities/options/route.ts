import { errorResponse, successResponse } from "@/lib/api/response";
import { getNationalityOptionsService } from "@/lib/services/nationalities.service";

export async function GET() {
  try {
    const data = await getNationalityOptionsService();

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
