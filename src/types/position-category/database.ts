import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

// Supabase Table

export type PositionCategory = Tables<"position_categories">;
export type PositionCategoryInsert = TablesInsert<"position_categories">;
export type PositionCategoryUpdate = TablesUpdate<"position_categories">;
