import { TransferType } from "@/enums/TransferType";
import { z } from "zod";

export const transferIdSchema = z.string().uuid();

export const transferMutationSchema = z.object({
  season_id: z.string(),
  from_club_id: z.string(),
  to_club_id: z.string(),
  transfer_type: z.enum([
    TransferType.TRANSFER,
    TransferType.LOAN,
    TransferType.LOAN_RETURN,
    TransferType.FREE,
    TransferType.RELEASED,
    TransferType.YOUTH_PROMOTION,
    TransferType.RETIRED,
  ]),
  transfer_fee: z.coerce.number().positive(),
  transfer_date: z.string(),
});

export const createTransferSchema = transferMutationSchema;

export const updateTransferSchema = transferMutationSchema;

export const transferSchema = transferMutationSchema.extend({
  id: transferIdSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const transfersSchema = z.array(transferSchema);

export const transfersQuerySchema = z.object({
  transfer_date: z.string().trim().optional(),
  transfer_fee: z.number().optional(),
  transfer_type: z.string().trim().optional(),
});
