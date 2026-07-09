import { playerPositionMutationSchema } from "@/lib/validations/player-positions.schema";
import { playerMutationSchema } from "@/lib/validations/players.schema";
import z from "zod";
import { ImagePayload } from "../image";
import { playerCareerMutationSchema } from "@/lib/validations/player-careers.schema";
import { playerNationalTeamMutationSchema } from "@/lib/validations/player-national-teams.schema";

export type UpsertPlayer = z.infer<typeof playerMutationSchema> & {
  id?: string;
  player_positions: z.infer<typeof playerPositionMutationSchema>[];
  player_careers: z.infer<typeof playerCareerMutationSchema>[];
  player_national_teams: z.infer<typeof playerNationalTeamMutationSchema>[];
} & ImagePayload;
