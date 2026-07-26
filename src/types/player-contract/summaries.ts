import { PlayerContract } from "./database";

export type PlayerContractSummary = Pick<
  PlayerContract,
  "id" | "salary" | "contract_start" | "contract_end"
>;
