import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  deleteClubTeamService,
  getClubTeamDetailService,
  updateClubTeamService,
} from "@/lib/services/club-teams.service";

type ClubTeamRouteContext = {
  params: Promise<{ clubId: string; teamId: string }>;
};

export async function GET(_request: Request, context: ClubTeamRouteContext) {
  try {
    const { teamId } = await context.params;
    const data = await getClubTeamDetailService(teamId);

    if (!data) {
      return errorResponse(new NotFoundError("Club team not found"));
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: ClubTeamRouteContext) {
  try {
    await authorizeManageContent();

    const { clubId, teamId } = await context.params;

    const currentClubTeam = await getClubTeamDetailService(teamId);

    if (!currentClubTeam) {
      return errorResponse(new NotFoundError("Club team not found"));
    }

    const body = await request.json();
    const data = await updateClubTeamService(teamId, clubId, body);

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, context: ClubTeamRouteContext) {
  try {
    await authorizeManageContent();

    const { teamId } = await context.params;

    const club = await getClubTeamDetailService(teamId);

    if (!club) {
      return errorResponse(new NotFoundError("Club team not found"));
    }

    await deleteClubTeamService(teamId);

    return noContentResponse();
  } catch (error) {
    return errorResponse(error);
  }
}
