import { getQuery } from "@/lib/api/query";
import { errorResponse, successResponse } from "@/lib/api/response";
import { getActivityLogsService } from "@/lib/services/activity-logs.service";
import { ActivityLogQuery } from "@/types/activity-log";

export async function GET(request: Request) {
  try {
    const query = getQuery<ActivityLogQuery>(request);

    const data = await getActivityLogsService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
