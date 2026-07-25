// Tables, Insert, Update

import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type Club = Tables<"clubs">;
export type ClubInsert = TablesInsert<"clubs">;
export type ClubUpdate = TablesUpdate<"clubs">;
