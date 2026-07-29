import { Region } from "./database";
import { RegionSummary } from "./summaries";

// Supabase Query Result

// Region List

export type DbRegionListRow = Pick<
  Region,
  "id" | "image" | "name" | "slug" | "region_type" | "parent_region_id"
> & {
  parent_region: RegionSummary[];
};

// Region Detail

export type DbRegionDetailRow = Region;

// Helpers

export type DbRegionRow = Pick<Region, "id" | "name" | "image">;
