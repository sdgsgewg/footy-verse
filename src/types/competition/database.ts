import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type Competition = Tables<"competitions">;
export type CompetitionInsert = TablesInsert<"competitions">;
export type CompetitionUpdate = TablesUpdate<"competitions">;
