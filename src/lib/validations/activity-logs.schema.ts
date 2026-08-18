import { z } from "zod";
import { idSchema, slugSchema } from "./primitives.schema";
import { listQuerySchema } from "./query.schema";
import {
  activityLogActionSchema,
  activityLogSortBySchema,
} from "./enums.schema";
import { activityEntityTypeSchema } from "@/config/entities";

export const activityLogMutationSchema = z.object({
  action: activityLogActionSchema,
  entity_type: activityEntityTypeSchema,
  entity_id: idSchema,
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255).nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).nullable().optional(),
});

export const createActivityLogSchema = activityLogMutationSchema;

export const updateActivityLogSchema = activityLogMutationSchema;

export const activityLogSchema = activityLogMutationSchema.extend({
  id: idSchema,
  slug: slugSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const activityLogsSchema = z.array(activityLogSchema);

export const activityLogsQuerySchema = listQuerySchema.extend({
  sortBy: activityLogSortBySchema.default("created_at"),
});
