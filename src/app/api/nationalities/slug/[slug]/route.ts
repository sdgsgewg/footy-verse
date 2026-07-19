import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getNationalityBySlugService } from "@/lib/services/nationalities.service";

type NationalityRouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: NationalityRouteContext) {
  try {
    const { slug } = await context.params;
    const data = await getNationalityBySlugService(slug);

    if (!data) {
      return errorResponse(new NotFoundError("Nationality not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
