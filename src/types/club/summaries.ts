import { Club } from "./database";

export type ClubSummary = Pick<Club, "id" | "image" | "name">;
