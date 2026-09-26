import { DbConfederationRow } from "../confederation";
import { DbRegionRow } from "../region";
import { Nationality } from "./database";

// Supabase Query Result

// Nationality List

export type DbNationalityListRow = Nationality & {
  confederation: DbConfederationRow | null;
  region: DbRegionRow | null;
};

// Nationality Detail

export type DbNationalityDetailRow = Nationality & {
  confederation: DbConfederationRow | null;
  region: DbRegionRow | null;
};

// Helper

export type DbNationalityRow = Pick<Nationality, "id" | "name" | "image">;

export type DbNationalityWithConfederationRow = Pick<
  Nationality,
  "id" | "name" | "image"
> & {
  confederation: DbConfederationRow | null;
};
