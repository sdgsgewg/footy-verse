import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type PlayerNationality = Tables<"player_nationalities">;
export type PlayerNationalityInsert = TablesInsert<"player_nationalities">;
export type PlayerNationalityUpdate = TablesUpdate<"player_nationalities">;
