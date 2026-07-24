// Tables, Insert, Update

import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type Player = Tables<"players">;
export type PlayerInsert = TablesInsert<"players">;
export type PlayerUpdate = TablesUpdate<"players">;
