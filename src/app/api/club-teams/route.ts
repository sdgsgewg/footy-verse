import { getCrudQuery } from "@/lib/api/query";
import { errorResponse, successResponse } from "@/lib/api/response";
import { getClubTeamsService } from "@/lib/services/club-teams.service";
import { ClubTeamQuery } from "@/types/club-team";

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
