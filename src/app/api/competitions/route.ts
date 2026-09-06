import { getCrudQuery } from "@/lib/api/query";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { getCompetitionInputFromFormData } from "@/lib/competitions/form-data";
import {
  createCompetitionService,
  getCompetitionsService,
} from "@/lib/services/competitions.service";
import { CompetitionQuery } from "@/types/competition";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<CompetitionQuery>(request, [
      "categoryId",
      "scopeId",
      "participantType",
      "gender",
    ]);

    const data = await getCompetitionsService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    const formData = await request.formData();

    const data = await createCompetitionService(
      getCompetitionInputFromFormData(formData),
      formData,
    );

    return createdResponse({
      success: true,
      data,
    });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
