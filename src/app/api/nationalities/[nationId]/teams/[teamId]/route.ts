import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { deleteNationalTeamService, getNationalTeamDetailService, updateNationalTeamService } from "@/lib/services/national-teams.service";

type NationalTeamRouteContext = {
  params: Promise<{ nationId: string; teamId: string }>;
};

export async function GET(
  _request: Request,
  context: NationalTeamRouteContext,
) {
  try {
    const { teamId } = await context.params;
    const data = await getNationalTeamDetailService(teamId);

    if (!data) {
      return errorResponse(new NotFoundError("National team not found"));
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: NationalTeamRouteContext) {
  try {
    await authorizeManageContent();

    const { nationId, teamId } = await context.params;

    const currentNationalTeam = await getNationalTeamDetailService(teamId);

    if (!currentNationalTeam) {
      return errorResponse(new NotFoundError("National team not found"));
    }

    const body = await request.json();
    const data = await updateNationalTeamService(teamId, nationId, body);

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  context: NationalTeamRouteContext,
) {
  try {
    await authorizeManageContent();

    const { teamId } = await context.params;

    const club = await getNationalTeamDetailService(teamId);

    if (!club) {
      return errorResponse(new NotFoundError("National team not found"));
    }

    await deleteNationalTeamService(teamId);

    return noContentResponse();
  } catch (error) {
    return errorResponse(error);
  }
}
