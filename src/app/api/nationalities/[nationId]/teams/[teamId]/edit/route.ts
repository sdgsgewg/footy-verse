import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getNationalTeamEditService } from "@/lib/services/national-teams.service";

type NationalTeamRouteContext = {
  params: Promise<{ nationId: string; teamId: string }>;
};

export async function GET(
  _request: Request,
  context: NationalTeamRouteContext,
) {
  try {
    const { teamId } = await context.params;
    const data = await getNationalTeamEditService(teamId);

    if (!data) {
      return errorResponse(new NotFoundError("National team not found"));
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
