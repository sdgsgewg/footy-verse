import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import {
  createSeasonService,
  getSeasonsService,
} from "@/lib/services/seasons.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      name: searchParams.get("name") || undefined,
    };

    const data = await getSeasonsService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await createSeasonService(body);

    return createdResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
