import { ActivityLog } from "./database";

// Supabase Query Result

// Activity Log List

export type DbActivityLogListRow = Pick<
  ActivityLog,
  "id" | "title" | "description" | "entity_type" | "created_at"
>;
