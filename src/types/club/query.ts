// Supabase Query Result

import { NationalitySummary } from "../nationality";
import { Club } from "./database";

// Club List

export type DbClubListRow = Pick<Club, "id" | "image" | "name" | "slug"> & {
  nation: NationalitySummary | null;
};

// Club Detail

export type DbClubDetailRow = Club & {
  nation: NationalitySummary | null;
};
