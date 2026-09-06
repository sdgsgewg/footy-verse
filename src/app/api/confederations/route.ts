import { getCrudQuery } from "@/lib/api/query";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { getConfederationInputFromFormData } from "@/lib/confederations/form-data";
import {
  createConfederationService,
  getConfederationsService,
} from "@/lib/services/confederations.service";
import { ConfederationQuery } from "@/types/confederation";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<ConfederationQuery>(request);

    const data = await getConfederationsService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    const formData = await request.formData();

    const data = await createConfederationService(
      getConfederationInputFromFormData(formData),
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
