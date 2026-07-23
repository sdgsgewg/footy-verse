import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getNationalityEditService } from "@/lib/services/nationalities.service";

type NationalityRouteContext = {
  params: Promise<{ nationId: string }>;
};

export async function GET(_request: Request, context: NationalityRouteContext) {
  try {
    const { nationId } = await context.params;
    const data = await getNationalityEditService(nationId);

    if (!data) {
      return errorResponse(new NotFoundError("Nationality not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
