import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getClubEditService } from "@/lib/services/clubs.service";

type ClubRouteContext = {
  params: Promise<{ clubId: string }>;
};

export async function GET(_request: Request, context: ClubRouteContext) {
  try {
    const { clubId } = await context.params;
    const data = await getClubEditService(clubId);

    if (!data) {
      return errorResponse(new NotFoundError("Club not found"));
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
