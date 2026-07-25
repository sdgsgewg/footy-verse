// API Response DTO

import { Season } from "./database";

// Position List

export type SeasonListItem = Pick<Season, "id" | "name" | "slug">;

// Position Detail

// Model for Edit

export type SeasonEditResponse = Pick<Season, "id" | "name">;

// Model View Detail

export type SeasonDetailResponse = Pick<Season, "id" | "name">;
