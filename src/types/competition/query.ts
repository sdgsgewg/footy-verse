import { DbCompetitionCategoryRow } from "../competition-category";
import { DbCompetitionScopeRow } from "../competition-scope";
import { DbConfederationRow } from "../confederation";
import { DbNationalityRow } from "../nationality";
import { DbRegionRow } from "../region";
import { Competition } from "./database";

// Supabase Query Result

// Competition List

export type DbCompetitionListRow = Pick<
  Competition,
  "id" | "image" | "name" | "slug" | "gender" | "age_group" | "participant_type"
> & {
  category: DbCompetitionCategoryRow;
  scope: DbCompetitionScopeRow;
  nationality: DbNationalityRow | null;
  confederation: DbConfederationRow | null;
  region: DbRegionRow | null;
};

// Competition Detail

export type DbCompetitionDetailRow = Competition & {
  category: DbCompetitionCategoryRow;
  scope: DbCompetitionScopeRow;
  nationality: DbNationalityRow | null;
  confederation: DbConfederationRow | null;
  region: DbRegionRow | null;
};

// Helpers

export type DbCompetitionRow = Pick<Competition, "id" | "name" | "image">;
