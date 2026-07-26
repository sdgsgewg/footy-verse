import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  createPlayerClubCareerService,
  getPlayerClubCareersService,
} from "@/lib/services/player-club-careers.service";
import { NextRequest } from "next/server";

type PlayerClubCareerRouteContext = {
  params: Promise<{ playerId: string }>;
};

export async function GET(
  _request: NextRequest,
  context: PlayerClubCareerRouteContext,
) {
  try {
    const { playerId } = await context.params;
    const data = await getPlayerClubCareersService(playerId);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(
  request: Request,
  context: PlayerClubCareerRouteContext,
) {
  try {
    await authorizeManageContent();

    const { playerId } = await context.params;

    const body = await request.json();
    const data = await createPlayerClubCareerService(playerId, body);

    return createdResponse(data);
  } catch (error: unknown) {
    console.error("Error: ", error);
    return errorResponse(error);
  }
}
