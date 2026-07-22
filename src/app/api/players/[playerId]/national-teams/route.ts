import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  createPlayerNationalTeamService,
  getPlayerNationalTeamsService,
} from "@/lib/services/player-national-teams.service";
import { NextRequest } from "next/server";

type PlayerNationalTeamRouteContext = {
  params: Promise<{ playerId: string }>;
};

export async function GET(
  _request: NextRequest,
  context: PlayerNationalTeamRouteContext,
) {
  try {
    const { playerId } = await context.params;
    const data = await getPlayerNationalTeamsService(playerId);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(
  request: Request,
  context: PlayerNationalTeamRouteContext,
) {
  try {
    await authorizeManageContent();

    const { playerId } = await context.params;

    const body = await request.json();
    const data = await createPlayerNationalTeamService(playerId, body);

    return createdResponse(data);
  } catch (error: unknown) {
    console.error("Error: ", error);
    return errorResponse(error);
  }
}
