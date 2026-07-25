import { getCrudQuery } from "@/lib/api/query";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  createSeasonService,
  getSeasonsService,
} from "@/lib/services/seasons.service";
import { SeasonQuery } from "@/types/season";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<SeasonQuery>(request);

    const data = await getSeasonsService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    const body = await request.json();
    const data = await createSeasonService(body);

    return createdResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
