import { DbNationalityRow, NationalitySummary } from "../nationality";
import { Club } from "./database";

// Supabase Query Result

// Club List

export type DbClubListRow = Pick<Club, "id" | "image" | "name" | "slug"> & {
  nation: NationalitySummary | null;
};

// Club Detail

export type DbClubDetailRow = Club & {
  nation: NationalitySummary | null;
};

// Helper

export type DbClubRow = Pick<Club, "id" | "name" | "image">;

export type DbClubWithNationalityRow = Pick<Club, "id" | "name" | "image"> & {
  nationality: DbNationalityRow;
};
