import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getNationalityEditService } from "@/lib/services/nationalities.service";

type NationalityRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: NationalityRouteContext) {
  try {
    const { id } = await context.params;
    const data = await getNationalityEditService(id);

    if (!data) {
      return errorResponse(new NotFoundError("Nationality not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
