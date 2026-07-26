import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  createPlayerNationalTeamCareerService,
  getPlayerNationalTeamCareersService,
} from "@/lib/services/player-national-team-careers.service";
import { NextRequest } from "next/server";

type PlayerNationalTeamCareerRouteContext = {
  params: Promise<{ playerId: string }>;
};

export async function GET(
  _request: NextRequest,
  context: PlayerNationalTeamCareerRouteContext,
) {
  try {
    const { playerId } = await context.params;
    const data = await getPlayerNationalTeamCareersService(playerId);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(
  request: Request,
  context: PlayerNationalTeamCareerRouteContext,
) {
  try {
    await authorizeManageContent();

    const { playerId } = await context.params;

    const body = await request.json();
    const data = await createPlayerNationalTeamCareerService(playerId, body);

    return createdResponse(data);
  } catch (error: unknown) {
    console.error("Error: ", error);
    return errorResponse(error);
  }
}
