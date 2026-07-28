import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { NotFoundError } from "@/lib/errors/http-error";
import {
  deleteCompetitionScopeService,
  getCompetitionScopeDetailService,
  updateCompetitionScopeService,
} from "@/lib/services/competition-scopes.service";

type CompetitionScopeRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: CompetitionScopeRouteContext,
) {
  try {
    const { id } = await context.params;
    const data = await getCompetitionScopeDetailService(id);

    if (!data) {
      return errorResponse(new NotFoundError("Competition scope not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(
  request: Request,
  context: CompetitionScopeRouteContext,
) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const currentPosition = await getCompetitionScopeDetailService(id);

    if (!currentPosition) {
      return errorResponse(new NotFoundError("Competition scope not found"));
    }

    const body = await request.json();
    const data = await updateCompetitionScopeService(id, body);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  context: CompetitionScopeRouteContext,
) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const position = await getCompetitionScopeDetailService(id);

    if (!position) {
      return errorResponse(new NotFoundError("Competition scope not found"));
    }

    await deleteCompetitionScopeService(id);

    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
