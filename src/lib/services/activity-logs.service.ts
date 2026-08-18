import { activityLogsQuerySchema } from "../validations/activity-logs.schema";
import { getActivityLogsRepo } from "../repositories/activity-logs.repo";

export async function getActivityLogsService(query: unknown) {
  const parsed = activityLogsQuerySchema.parse(query);

  return getActivityLogsRepo(parsed);
}
