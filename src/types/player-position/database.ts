import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type PlayerPosition = Tables<"player_positions">;
export type PlayerPositionInsert = TablesInsert<"player_positions">;
export type PlayerPositionUpdate = TablesUpdate<"player_positions">;
