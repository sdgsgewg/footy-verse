import { getCrudQuery } from "@/lib/api/query";
import { errorResponse, successResponse } from "@/lib/api/response";
import { getNationalTeamsService } from "@/lib/services/national-teams.service";
import { NationalTeamQuery } from "@/types/national-team";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<NationalTeamQuery>(request, [
      "ageGroup",
      "nationId",
      "nationId",
    ]);

    const data = await getNationalTeamsService(query);

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
