// API Response DTO

// Player Shirt Number List

export interface PlayerShirtNumberListItem {
  id: string;
  shirtNumber: number;
  startDate: string;
  endDate: string | null;
}

// Player Shirt Number Detail

// Model for Edit

export interface PlayerShirtNumberEditResponse {
  shirtNumber: number;
  startDate: string;
  endDate: string | null;
}

// Model View Detail

export interface PlayerShirtNumberDetailResponse {
  id: string;
  shirtNumber: number;
  startDate: string;
  endDate: string | null;
}

