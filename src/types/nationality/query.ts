// Supabase Query Result

import { Nationality } from "./database";

// Club List

export type DbNationalityListRow = Pick<
  Nationality,
  "id" | "image" | "name" | "slug"
>;

// Club Detail

export type DbNationalityDetailRow = Nationality;
