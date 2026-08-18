import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type ActivityLog = Tables<"activity_logs">;
export type ActivityLogInsert = TablesInsert<"activity_logs">;
export type ActivityLogUpdate = TablesUpdate<"activity_logs">;
