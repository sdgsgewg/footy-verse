import { getCrudQuery } from "@/lib/api/query";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  createCompetitionScopeService,
  getCompetitionScopesService,
} from "@/lib/services/competition-scopes.service";
import { CompetitionScopeQuery } from "@/types/competition-scope";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<CompetitionScopeQuery>(request);

    const data = await getCompetitionScopesService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    const body = await request.json();
    const data = await createCompetitionScopeService(body);

    return createdResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
