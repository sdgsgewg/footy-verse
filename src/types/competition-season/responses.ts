// DTO helper

// API Response DTO

// Competition Season List

export type CompetitionSeasonWinnerResponse = {
  id: string;

  name: string;

  imageUrl: string | null;
} | null;

export interface CompetitionSeasonListItem {
  id: string;
  name: string;
  seasonLabel: string;
  slug: string;

  startDate: string;
  endDate: string | null;
  status: string;

  winner: CompetitionSeasonWinnerResponse;
}

// Competition Season Detail

// Model for Edit

export interface CompetitionSeasonEditResponse {
  id: string;
  name: string;
  seasonLabel: string;
  startDate: string;
  endDate: string | null;
  status: string;
  winnerClubTeamId: string | null;
  winnerNationalTeamId: string | null;
}

// Model View Detail

export interface CompetitionSeasonDetailResponse {
  id: string;
  name: string;
  seasonLabel: string;
  slug: string;

  startDate: string;
  endDate: string | null;
  status: string;

  winner: CompetitionSeasonWinnerResponse;
}

// Helper for other entity

export interface CompetitionSeasonResponse {
  id: string;
  name: string;
}
