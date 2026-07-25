import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type Season = Tables<"seasons">;
export type SeasonInsert = TablesInsert<"seasons">;
export type SeasonUpdate = TablesUpdate<"seasons">;
