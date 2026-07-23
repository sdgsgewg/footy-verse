import { AgeGroup } from "@/enums/AgeGroup";
import { SquadType } from "@/enums/SquadType";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  createClubTeamService,
  getClubTeamsService,
} from "@/lib/services/club-teams.service";
import { GetClubTeamsParams } from "@/types/club-team";

type ClubTeamRouteContext = {
  params: Promise<{ clubId: string }>;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query: GetClubTeamsParams = {
      squadType: (searchParams.get("squadType") as SquadType) || undefined,
      ageGroup: (searchParams.get("ageGroup") as AgeGroup) || undefined,
      clubId: searchParams.get("clubId") || undefined,
    };

    const data = await getClubTeamsService(query);

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request, context: ClubTeamRouteContext) {
  try {
    await authorizeManageContent();

    const { clubId } = await context.params;

    const body = await request.json();
    const data = await createClubTeamService(clubId, body);

    return createdResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
