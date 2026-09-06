import { getCrudQuery } from "@/lib/api/query";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { getRegionInputFromFormData } from "@/lib/regions/form-data";
import {
  createRegionService,
  getRegionsService,
} from "@/lib/services/regions.service";
import { RegionQuery } from "@/types/region";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<RegionQuery>(request);

    const data = await getRegionsService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    const formData = await request.formData();

    const data = await createRegionService(
      getRegionInputFromFormData(formData),
      formData,
    );

    return createdResponse({
      success: true,
      data,
    });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
