import { getCrudQuery } from "@/lib/api/query";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  createPositionCategoryService,
  getPositionCategoriesService,
} from "@/lib/services/position-categories.service";
import { PositionCategoryQuery } from "@/types/position-category";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<PositionCategoryQuery>(request);

    const data = await getPositionCategoriesService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    const body = await request.json();
    const data = await createPositionCategoryService(body);

    return createdResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
