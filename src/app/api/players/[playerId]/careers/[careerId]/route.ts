import { errorResponse, successResponse } from "@/lib/api/response";
import {
  deletePlayerCareerService,
  getPlayerCareerByIdService,
  updatePlayerCareerService,
} from "@/lib/services/player-careers.service";

import { NextResponse } from "next/server";

type PlayerRouteContext = {
  params: Promise<{ playerId: string; careerId: string }>;
};

export async function GET(_request: Request, context: PlayerRouteContext) {
  try {
    const { careerId } = await context.params;
    const data = await getPlayerCareerByIdService(careerId);

    if (!data) {
      return errorResponse(new Error("Player career not found"), 404);
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: PlayerRouteContext) {
  try {
    const { playerId, careerId } = await context.params;

    const body = await request.json();
    const data = await updatePlayerCareerService(careerId, playerId, body);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, context: PlayerRouteContext) {
  try {
    const { careerId } = await context.params;

    await deletePlayerCareerService(careerId);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
