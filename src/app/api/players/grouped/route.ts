import { getCrudQuery } from "@/lib/api/query";
import { errorResponse, successResponse } from "@/lib/api/response";
import { getGroupedPlayersService } from "@/lib/services/players.service";
import { GroupedPlayerFilter } from "@/types/player";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<GroupedPlayerFilter>(request, [
      "positionId",
      "nationId",
      "clubTeamId",
      "nationalTeamId",
    ]);

    const data = await getGroupedPlayersService(query);

    return successResponse(data);
  } catch (error) {
    console.error(error);
    return errorResponse(error);
  }
}
