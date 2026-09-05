import {
  createClubService,
  getClubsService,
} from "@/lib/services/clubs.service";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { getClubInputFromFormData } from "@/lib/clubs/form-data";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { getCrudQuery } from "@/lib/api/query";
import { ClubQuery } from "@/types/club";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<ClubQuery>(request, ["nationId"]);

    const data = await getClubsService(query);

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    const formData = await request.formData();

    const data = await createClubService(
      getClubInputFromFormData(formData),
      formData,
    );

    return createdResponse({
      success: true,
      data,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
