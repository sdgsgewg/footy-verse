import { isFormDataRequest } from "@/lib/api/request";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import {
  createPositionService,
  getPositionsService,
} from "@/lib/services/positions.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      name: searchParams.get("name") || undefined,
    };

    const data = await getPositionsService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    if (!isFormDataRequest(request)) {
      const body = await request.json();
      const data = await createPositionService(body);

      return createdResponse(data);
    }

    const formData = await request.formData();
    const name = String(formData.get("name") ?? "");

    try {
      const data = await createPositionService({ name });

      return createdResponse({
        success: true,
        data,
      });
    } catch (error) {
      throw error;
    }
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
