import { Nationality } from "./database";

// Supabase Query Result

// Nationality List

export type DbNationalityListRow = Pick<
  Nationality,
  "id" | "image" | "name" | "slug"
>;

// Nationality Detail

export type DbNationalityDetailRow = Nationality;
