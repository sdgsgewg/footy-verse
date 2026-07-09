import { z } from "zod";

export const transferIdSchema = z.string().uuid();

const transferMutationSchema = z.object({
  name: z.string().min(1).max(255),
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
  name: z.string().trim().min(1).max(255).optional(),
});
