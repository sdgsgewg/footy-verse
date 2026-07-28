import {
  createPlayerTransferSchema,
  playerTransfersQuerySchema,
  updatePlayerTransferSchema,
} from "@/lib/validations/player-transfers.schema";
import z from "zod";

/**
 * Input dari client (dari URL / API route)
 */
export type PlayerTransferQuery = Partial<
  z.input<typeof playerTransfersQuerySchema>
>;

/**
 * Khusus dipakai setelah parse, termasuk state React
 */
export type PlayerTransferFilter = z.infer<typeof playerTransfersQuerySchema>;

export type PlayerTransferCreateInput = z.infer<
  typeof createPlayerTransferSchema
>;

export type PlayerTransferUpdateInput = z.infer<
  typeof updatePlayerTransferSchema
>;
