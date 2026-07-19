import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getClubBySlugService } from "@/lib/services/clubs.service";

type ClubRouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: ClubRouteContext) {
  try {
    const { slug } = await context.params;
    const data = await getClubBySlugService(slug);

    if (!data) {
      return errorResponse(new NotFoundError("Club not found"));
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
