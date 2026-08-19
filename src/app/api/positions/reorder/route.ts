import { errorResponse, successResponse } from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { reorderPositionsService } from "@/lib/services/positions.service";


export async function PUT(request: Request) {
  try {
    await authorizeManageContent();

    const body = await request.json();
    const data = await reorderPositionsService(body);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
