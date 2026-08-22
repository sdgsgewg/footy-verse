import { errorResponse, successResponse } from "@/lib/api/response";
import { getConfederationOptionsService } from "@/lib/services/confederations.service";

export async function GET() {
  try {
    const data = await getConfederationOptionsService();

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
