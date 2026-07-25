// Supabase Query Result

import { Club } from "./database";
import { NationalitySummary } from "./summaries";

// Club List

export type DbClubListRow = Pick<Club, "id" | "image" | "name" | "slug"> & {
  nation: NationalitySummary | null;
};

// Club Detail

export type DbClubDetailRow = Club & {
  nation: NationalitySummary | null;
};
