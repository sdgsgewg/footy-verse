import { AgeGroup } from "@/enums/AgeGroup";
import { PreferredFoot } from "@/enums/PreferredFoot";
import { SquadType } from "@/enums/SquadType";
import { TeamCategory } from "@/enums/TeamCategory";
import z from "zod";

// Club

export const clubSortBySchema = z.enum(["name", "nation", "created_at"]);

export type ClubSortBy = z.infer<typeof clubSortBySchema>;

// Club Team

export const squadTypeSchema = z.enum([
  SquadType.FIRST_TEAM,
  SquadType.B_TEAM,
  SquadType.RESERVE,
  SquadType.ACADEMY,
]);

// Nationality

export const nationalitySortBySchema = z.enum(["name", "created_at"]);

export type NationalitySortBy = z.infer<typeof nationalitySortBySchema>;

// Both Club and National Team

export const teamCategorySchema = z.enum([
  TeamCategory.MEN,
  TeamCategory.WOMEN,
]);

export const ageGroupSchema = z.enum([
  AgeGroup.SENIOR,
  AgeGroup.U23,
  AgeGroup.U21,
  AgeGroup.U19,
  AgeGroup.U18,
  AgeGroup.U17,
]);

// Position Category

export const positionCategorySortBySchema = z.enum(["name", "created_at"]);

// Position

export const positionSortBySchema = z.enum(["name", "created_at"]);

//Player

export const playerSortBySchema = z.enum([
  "name",
  "market_value",
  "created_at",
]);

export type PlayerSortBy = z.infer<typeof playerSortBySchema>;

export const prefFootSchema = z.enum([
  PreferredFoot.RIGHT,
  PreferredFoot.LEFT,
  PreferredFoot.BOTH,
]);

// Season

export const seasonSortBySchema = z.enum(["name", "created_at"]);

// Region
// Competition

// Filter, Sort, Pagination
export const sortOrderSchema = z.enum(["asc", "desc"]);
