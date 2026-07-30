import { DbConfederationRow } from "../confederation";
import { Nationality } from "./database";

// Supabase Query Result

// Nationality List

export type DbNationalityListRow = Nationality & {
  confederation: DbConfederationRow | null;
};

// Nationality Detail

export type DbNationalityDetailRow = Nationality;

// Helper

export type DbNationalityRow = Pick<Nationality, "id" | "name" | "image">;
