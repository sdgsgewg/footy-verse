import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type CompetitionScope = Tables<"competition_scopes">;
export type CompetitionScopeInsert = TablesInsert<"competition_scopes">;
export type CompetitionScopeUpdate = TablesUpdate<"competition_scopes">;
