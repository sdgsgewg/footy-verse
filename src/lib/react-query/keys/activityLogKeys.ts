import { ActivityLogQuery } from "@/types/activity-log";

export const activityLogKeys = {
  all: ["activity-logs"] as const,

  lists: () => [...activityLogKeys.all, "list"] as const,

  list: (params?: ActivityLogQuery) =>
    [...activityLogKeys.lists(), params] as const,
};
