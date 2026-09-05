import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { NotFoundError } from "@/lib/errors/http-error";
import { getNationalityInputFromFormData } from "@/lib/nationalities/form-data";
import {
  deleteNationalityService,
  getNationalityDetailService,
  updateNationalityService,
} from "@/lib/services/nationalities.service";

type NationalityRouteContext = {
  params: Promise<{ nationId: string }>;
};

export async function GET(_request: Request, context: NationalityRouteContext) {
  try {
    const { nationId } = await context.params;
    const data = await getNationalityDetailService(nationId);

    if (!data) {
      return errorResponse(new NotFoundError("Nationality not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: NationalityRouteContext) {
  try {
    await authorizeManageContent();

    const { nationId } = await context.params;

    const formData = await request.formData();

    const data = await updateNationalityService(
      nationId,
      getNationalityInputFromFormData(formData),
      formData,
    );

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  context: NationalityRouteContext,
) {
  try {
    await authorizeManageContent();

    const { nationId } = await context.params;

    await deleteNationalityService(nationId);

    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
