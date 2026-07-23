import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getClubTeamEditService } from "@/lib/services/club-teams.service";

type ClubTeamRouteContext = {
  params: Promise<{ clubId: string; teamId: string }>;
};

export async function GET(_request: Request, context: ClubTeamRouteContext) {
  try {
    const { teamId } = await context.params;
    const data = await getClubTeamEditService(teamId);

    if (!data) {
      return errorResponse(new NotFoundError("Club team not found"));
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
