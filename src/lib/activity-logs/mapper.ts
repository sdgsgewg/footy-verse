import {
  ActivityLogListItem,
  DbActivityLogListRow,
} from "@/types/activity-log";
import { formatRelativeDate } from "../utils/date";
import { formatEntity } from "./formatter";

/**
 *
 * @param activityLog
 * @returns ActivityLogListItem
 */
export function mapActivityLogListItem(
  activityLog: DbActivityLogListRow,
): ActivityLogListItem {
  const { id, title, description, created_at, entity_type } = activityLog;

  return {
    id,
    title,
    description,
    time: formatRelativeDate(created_at),
    entity: formatEntity(entity_type),
  };
}
