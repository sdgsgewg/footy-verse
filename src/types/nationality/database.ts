import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type Nationality = Tables<"nationalities">;
export type NationalityInsert = TablesInsert<"nationalities">;
export type NationalityUpdate = TablesUpdate<"nationalities">;
