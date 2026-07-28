import { CompetitionScope } from "./database";

// API Response DTO

// Competition List

export type CompetitionScopeListItem = Pick<
  CompetitionScope,
  "id" | "name" | "slug" | "description"
>;

// Competition Detail

// Model for Edit

export type CompetitionScopeEditResponse = Pick<
  CompetitionScope,
  "id" | "name" | "description"
>;

// Model View Detail

export type CompetitionScopeDetailResponse = Pick<
  CompetitionScope,
  "id" | "name" | "description"
>;
