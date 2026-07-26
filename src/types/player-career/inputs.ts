import {
  createPlayerCareerSchema,
  updatePlayerCareerSchema,
} from "@/lib/validations/player-careers.schema";
import z from "zod";

export type PlayerCareerCreateInput = z.infer<typeof createPlayerCareerSchema>;

export type PlayerCareerUpdateInput = z.infer<typeof updatePlayerCareerSchema>;
