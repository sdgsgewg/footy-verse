import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { getConfederationInputFromFormData } from "@/lib/confederations/form-data";
import { NotFoundError } from "@/lib/errors/http-error";
import {
  deleteConfederationService,
  getConfederationDetailService,
  updateConfederationService,
} from "@/lib/services/confederations.service";

type ConfederationRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: ConfederationRouteContext,
) {
  try {
    const { id } = await context.params;
    const data = await getConfederationDetailService(id);

    if (!data) {
      return errorResponse(new NotFoundError("Confederation not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(
  request: Request,
  context: ConfederationRouteContext,
) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const formData = await request.formData();

    const data = await updateConfederationService(
      id,
      getConfederationInputFromFormData(formData),
      formData,
    );

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  context: ConfederationRouteContext,
) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    await deleteConfederationService(id);

    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
