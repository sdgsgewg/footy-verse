import { DbRegionRow } from "../region";
import { Confederation } from "./database";

// Supabase Query Result

// Confederation List

export type DbConfederationListRow = Pick<
  Confederation,
  "id" | "image" | "name" | "slug" | "founded"
> & {
  region: DbRegionRow;
};

// Confederation Detail

export type DbConfederationDetailRow = Confederation & {
  region: DbRegionRow;
};

// Helpers

export type DbConfederationRow = Pick<Confederation, "id" | "name" | "image">;
