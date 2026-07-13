import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import {
  createPlayerCareerService,
  getPlayerCareersService,
} from "@/lib/services/player-careers.service";
import { NextRequest } from "next/server";

type PlayerCareerRouteContext = {
  params: Promise<{ playerId: string }>;
};

export async function GET(
  _request: NextRequest,
  context: PlayerCareerRouteContext,
) {
  try {
    const { playerId } = await context.params;
    const data = await getPlayerCareersService(playerId);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(
  request: Request,
  context: PlayerCareerRouteContext,
) {
  try {
    const { playerId } = await context.params;

    const body = await request.json();
    const data = await createPlayerCareerService(playerId, body);

    return createdResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
