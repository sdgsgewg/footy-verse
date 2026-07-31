import { getCrudQuery } from "@/lib/api/query";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  createNationalTeamService,
  getNationalTeamsService,
} from "@/lib/services/national-teams.service";
import { NationalTeamQuery } from "@/types/national-team";

type NationalTeamRouteContext = {
  params: Promise<{ nationId: string }>;
};

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<NationalTeamQuery>(request, [
      "teamCategory",
      "ageGroup",
      "nationId",
    ]);

    const data = await getNationalTeamsService(query);

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(
  request: Request,
  context: NationalTeamRouteContext,
) {
  try {
    await authorizeManageContent();

    const { nationId } = await context.params;

    const body = await request.json();
    const data = await createNationalTeamService(nationId, body);

    return createdResponse(data);
  } catch (error) {
    console.error(error);
    return errorResponse(error);
  }
}
