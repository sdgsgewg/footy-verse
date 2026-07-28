import { RegionSummary } from "../region";
import { Nationality } from "./database";

// Supabase Query Result

// Nationality List

export type DbNationalityListRow = Nationality & {
  region: RegionSummary | null;
};

// Nationality Detail

export type DbNationalityDetailRow = Nationality;
