import { DbConfederationRow } from "../confederation";
import { Nationality } from "./database";

// Supabase Query Result

// Nationality List

export type DbNationalityListRow = Nationality & {
  confederation: DbConfederationRow | null;
};

// Nationality Detail

export type DbNationalityDetailRow = Nationality & {
  confederation: DbConfederationRow | null;
};

// Helper

export type DbNationalityRow = Pick<Nationality, "id" | "name" | "image">;

export type DbNationalityWithConfederationRow = Pick<
  Nationality,
  "id" | "name" | "image"
> & {
  confederation: DbConfederationRow | null;
};
