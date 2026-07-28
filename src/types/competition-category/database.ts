import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type CompetitionCategory = Tables<"competition_categories">;
export type CompetitionCategoryInsert = TablesInsert<"competition_categories">;
export type CompetitionCategoryUpdate = TablesUpdate<"competition_categories">;
