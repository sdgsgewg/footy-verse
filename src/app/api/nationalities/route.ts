import { getCrudQuery } from "@/lib/api/query";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { getNationalityInputFromFormData } from "@/lib/nationalities/form-data";
import {
  createNationalityService,
  getNationalitiesService,
} from "@/lib/services/nationalities.service";
import { NationalityQuery } from "@/types/nationality";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<NationalityQuery>(request, ["confederationId"]);

    const data = await getNationalitiesService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    const formData = await request.formData();

    const data = await createNationalityService(
      getNationalityInputFromFormData(formData),
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
