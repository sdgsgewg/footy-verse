// Supabase Table

import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type Position = Tables<"positions">;
export type PositionInsert = TablesInsert<"positions">;
export type PositionUpdate = TablesUpdate<"positions">;
