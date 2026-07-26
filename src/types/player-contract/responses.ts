// API Response DTO

// Player Contract List

export interface PlayerContractListItem {
  id: string;
  contractStart: string;
  contractEnd: string;
  salary: number;
}

// Player Contract Detail

// Model for Edit

export interface PlayerContractEditResponse {
  contractStart: string;
  contractEnd: string;
  salary: number;
}

// Model View Detail

export interface PlayerContractDetailResponse {
  id: string;
  contractStart: string;
  contractEnd: string;
  salary: number;
}
