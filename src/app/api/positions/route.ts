import { getCrudQuery } from "@/lib/api/query";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  createPositionService,
  getPositionsService,
} from "@/lib/services/positions.service";
import { PositionQuery } from "@/types/position";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<PositionQuery>(request, ["categoryId"]);

    const data = await getPositionsService(query);

    return successResponse(data);
  } catch (error: unknown) {
    console.error("Error: ", error);
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    const body = await request.json();
    const data = await createPositionService(body);

    return createdResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
