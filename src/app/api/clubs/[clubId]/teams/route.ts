import { getCrudQuery } from "@/lib/api/query";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  createClubTeamService,
  getClubTeamsService,
} from "@/lib/services/club-teams.service";
import { ClubTeamQuery } from "@/types/club-team";

type ClubTeamRouteContext = {
  params: Promise<{ clubId: string }>;
};

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<ClubTeamQuery>(request, [
      "squadType",
      "ageGroup",
      "clubId",
    ]);

    const data = await getClubTeamsService(query);

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request, context: ClubTeamRouteContext) {
  try {
    await authorizeManageContent();

    const { clubId } = await context.params;

    const body = await request.json();
    const data = await createClubTeamService(clubId, body);

    return createdResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
