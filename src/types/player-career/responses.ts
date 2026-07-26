// Player Career Detail

// Model for Edit

export interface PlayerCareerEditResponse {
  joinedAt: string;
  leftAt: string | null;
}

// Model for view detail

export interface PlayerCareerDetailResponse {
  id: string;
  joinedAt: string;
  leftAt: string | null;
}

// Helper for other entity

export interface PlayerCareerResponse {
  id: string;
  joinedAt: string;
  leftAt: string | null;
}
