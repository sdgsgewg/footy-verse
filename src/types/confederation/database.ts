import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type Confederation = Tables<"confederations">;
export type ConfederationInsert = TablesInsert<"confederations">;
export type ConfederationUpdate = TablesUpdate<"confederations">;
