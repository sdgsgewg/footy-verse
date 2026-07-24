// PlayerFilter

import { SortOrder } from "../sort";

export type PlayerSortBy = "name" | "market_value" | "dob" | "created_at";

export interface PlayerFilter {
  name: string;
  nationId: string | undefined;
  clubTeamId: string | undefined;

  page: number;
  limit: number;

  sortBy: PlayerSortBy;
  sortOrder: SortOrder;
}
