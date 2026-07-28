import { getCrudQuery } from "@/lib/api/query";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  createCompetitionCategoryService,
  getCompetitionCategoriesService,
} from "@/lib/services/competition-categories.service";
import { CompetitionCategoryQuery } from "@/types/competition-category";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<CompetitionCategoryQuery>(request);

    const data = await getCompetitionCategoriesService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    const body = await request.json();
    const data = await createCompetitionCategoryService(body);

    return createdResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
