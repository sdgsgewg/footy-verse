import {
  createPlayerShirtNumberSchema,
  playerShirtNumbersQuerySchema,
} from "@/lib/validations/player-shirt-numbers.schema";
import z from "zod";

/**
 * Input dari client (dari URL / API route)
 */
export type PlayerShirtNumberQuery = Partial<
  z.input<typeof playerShirtNumbersQuerySchema>
>;

/**
 * Khusus dipakai setelah parse, termasuk state React
 */
export type PlayerShirtNumberFilter = z.infer<
  typeof playerShirtNumbersQuerySchema
>;

export type PlayerShirtNumberCreateInput = z.infer<
  typeof createPlayerShirtNumberSchema
>;
