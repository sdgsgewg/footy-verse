import {
  deleteClubService,
  getClubDetailService,
  updateClubService,
} from "@/lib/services/clubs.service";
import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { getClubInputFromFormData } from "@/lib/clubs/form-data";
import { NotFoundError } from "@/lib/errors/http-error";
import { authorizeManageContent } from "@/lib/auth/api-authorization";

type ClubRouteContext = {
  params: Promise<{ clubId: string }>;
};

export async function GET(_request: Request, context: ClubRouteContext) {
  try {
    const { clubId } = await context.params;
    const data = await getClubDetailService(clubId);

    if (!data) {
      return errorResponse(new NotFoundError("Club not found"));
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: ClubRouteContext) {
  try {
    await authorizeManageContent();

    const { clubId } = await context.params;

    const formData = await request.formData();

    const data = await updateClubService(
      clubId,
      getClubInputFromFormData(formData),
      formData,
    );

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, context: ClubRouteContext) {
  try {
    await authorizeManageContent();

    const { clubId } = await context.params;

    await deleteClubService(clubId);

    return noContentResponse();
  } catch (error) {
    return errorResponse(error);
  }
}
