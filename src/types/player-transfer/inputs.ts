import {
  createPlayerTransferSchema,
  updatePlayerTransferSchema,
} from "@/lib/validations/player-transfers.schema";
import z from "zod";

export type PlayerTransferCreateInput = z.infer<
  typeof createPlayerTransferSchema
>;

export type PlayerTransferUpdateInput = z.infer<
  typeof updatePlayerTransferSchema
>;
