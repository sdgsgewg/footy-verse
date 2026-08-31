import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  createPlayerClubTeamCareerService,
  getPlayerClubTeamCareersService,
} from "@/lib/services/player-club-team-careers.service";
import { NextRequest } from "next/server";

type PlayerClubTeamCareerRouteContext = {
  params: Promise<{ playerId: string }>;
};

export async function GET(
  _request: NextRequest,
  context: PlayerClubTeamCareerRouteContext,
) {
  try {
    const { playerId } = await context.params;
    const data = await getPlayerClubTeamCareersService(playerId);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(
  request: Request,
  context: PlayerClubTeamCareerRouteContext,
) {
  try {
    await authorizeManageContent();

    const { playerId } = await context.params;

    const body = await request.json();
    const data = await createPlayerClubTeamCareerService(playerId, body);

    return createdResponse(data);
  } catch (error: unknown) {
    console.error(error);
    return errorResponse(error);
  }
}
