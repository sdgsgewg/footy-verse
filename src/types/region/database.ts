import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type Region = Tables<"regions">;
export type RegionInsert = TablesInsert<"regions">;
export type RegionUpdate = TablesUpdate<"regions">;
