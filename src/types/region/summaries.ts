import { Region } from "./database";

export type RegionSummary = Pick<Region, "id" | "name" | "image">;
