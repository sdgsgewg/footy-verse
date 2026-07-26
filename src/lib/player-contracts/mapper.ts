import {
  DbPlayerContractDetailRow,
  PlayerContractDetailResponse,
  PlayerContractEditResponse,
} from "@/types/player-contract";

export function mapPlayerContractEditResponse(
  playerContract: DbPlayerContractDetailRow,
): PlayerContractEditResponse {
  const { salary, contract_start, contract_end } = playerContract;

  return {
    salary,
    contractStart: contract_start,
    contractEnd: contract_end,
  };
}

export function mapPlayerContractDetailResponse(
  playerContract: DbPlayerContractDetailRow,
): PlayerContractDetailResponse {
  const { id, salary, contract_start, contract_end } = playerContract;

  return {
    id,
    salary,
    contractStart: contract_start,
    contractEnd: contract_end,
  };
}
