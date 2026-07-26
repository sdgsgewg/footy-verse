import { createPlayerContractSchema } from "@/lib/validations/player-contracts.schema";
import z from "zod";

export type PlayerContractCreateInput = z.infer<
  typeof createPlayerContractSchema
>;
