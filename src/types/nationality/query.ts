// Supabase Query Result

import { Nationality } from "./database";

// Nationality List

export type DbNationalityListRow = Pick<
  Nationality,
  "id" | "image" | "name" | "slug"
>;

// Nationality Detail

export type DbNationalityDetailRow = Nationality;
