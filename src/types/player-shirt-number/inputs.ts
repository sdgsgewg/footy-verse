import { createPlayerShirtNumberSchema } from "@/lib/validations/player-shirt-numbers.schema";
import z from "zod";

export type PlayerShirtNumberCreateInput = z.infer<
  typeof createPlayerShirtNumberSchema
>;
