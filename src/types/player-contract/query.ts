import { PlayerContract } from "./database";

// Supabase Query Result

// Player Contract List

export type DbPlayerContractListRow = Pick<
  PlayerContract,
  "id" | "salary" | "contract_start" | "contract_end"
>;

// Player Contract Detail

export type DbPlayerContractDetailRow = Pick<
  PlayerContract,
  "id" | "salary" | "contract_start" | "contract_end"
>;
