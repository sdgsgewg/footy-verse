import { createClient } from "@/utils/supabase/server";
import { Entity, ENTITY_CONFIG } from "@/config/entities";
import { createPaginatedResponse } from "../pagination";
import {
  ActivityLogCreateInput,
  ActivityLogFilter,
  ActivityLogListResponse,
  ActivityLogMetadata,
  DbActivityLogListRow,
} from "@/types/activity-log";
import { mapActivityLogListItem } from "../activity-logs/mapper";
import { ActivityLogAction } from "@/enums/ActivityLogAction";
import { generateActivityLogMessage } from "../activity-logs/util";

async function getSupabase() {
  return createClient();
}

const getActivityLogTable = () => {
  return ENTITY_CONFIG["activityLog"]["table"];
};

function getActivityLogsBaseQuery() {
  return `
    id,
    title,
    description,
    entity_type,
    created_at
  `;
}

/**
 *
 * @param params
 * @returns ActivityLogFilter
 */
export async function getActivityLogsRepo(
  params: ActivityLogFilter,
): Promise<ActivityLogListResponse> {
  const supabase = await getSupabase();

  // Base Query
  let query = supabase
    .from(getActivityLogTable())
    .select(getActivityLogsBaseQuery(), {
      count: "exact",
    });

  // Filter

  // Sort

  query = query.order(params.sortBy, {
    ascending: params.sortOrder === "asc",
  });

  // Pagination

  const from = (params.page - 1) * params.limit;
  const to = from + params.limit - 1;

  query = query.range(from, to);

  // Execute

  const { data, error, count } =
    await query.overrideTypes<DbActivityLogListRow[]>();

  if (error) throw error;

  return createPaginatedResponse({
    items: (data ?? []).map(mapActivityLogListItem),
    count,
    page: params.page,
    limit: params.limit,
  });
}

/**
 *
 * @param activityLog
 * @returns
 */
export async function createActivityLogRepo(
  activityLog: ActivityLogCreateInput,
): Promise<void> {
  const supabase = await getSupabase();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from(getActivityLogTable())
    .insert({ ...activityLog, actor_id: user.id });

  if (error) throw error;
}

/**
 * Helper for other entity to insert activity log
 * @param params
 */

interface CreateEntityActivityLogParams {
  entity: Entity;
  action: ActivityLogAction;
  entityId: string;
  name?: string;
  metadata?: ActivityLogMetadata;
}

export async function createEntityActivityLog({
  entity,
  action,
  entityId,
  name,
  metadata,
}: CreateEntityActivityLogParams): Promise<void> {
  const { title, description } = generateActivityLogMessage({
    entity,
    action,
    name,
  });

  await createActivityLogRepo({
    action,
    entity_type: ENTITY_CONFIG[entity].activityType,
    entity_id: entityId,
    title,
    description,
    metadata: {
      entity: {
        name,
      },
      ...metadata,
    },
  });
}
