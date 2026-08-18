import {
  activityLogMutationSchema,
  activityLogsQuerySchema,
  createActivityLogSchema,
  updateActivityLogSchema,
} from "@/lib/validations/activity-logs.schema";
import z from "zod";

// Repo Request (from zod)

export type ActivityLogQuery = Partial<z.input<typeof activityLogsQuerySchema>>;
export type ActivityLogFilter = z.infer<typeof activityLogsQuerySchema>;

export type ActivityLogMetadata = Record<string, unknown>;

export type ActivityLogCreateInput = z.infer<typeof createActivityLogSchema>;
export type ActivityLogUpdateInput = z.infer<typeof updateActivityLogSchema>;

// Mutation

export type UpsertActivityLogInput = z.infer<
  typeof activityLogMutationSchema
> & {
  id?: string;
};
