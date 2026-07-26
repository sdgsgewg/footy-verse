import { Nationality } from "./database";

export type NationalitySummary = Pick<Nationality, "id" | "name" | "image">;
