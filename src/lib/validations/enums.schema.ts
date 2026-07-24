import { AgeGroup } from "@/enums/AgeGroup";
import { PreferredFoot } from "@/enums/PreferredFoot";
import { SquadType } from "@/enums/SquadType";
import { TeamCategory } from "@/enums/TeamCategory";
import z from "zod";

// Club Team

export const squadTypeSchema = z.enum([
  SquadType.FIRST_TEAM,
  SquadType.B_TEAM,
  SquadType.RESERVE,
  SquadType.ACADEMY,
]);

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

//Player

export const prefFootSchema = z.enum([
  PreferredFoot.RIGHT,
  PreferredFoot.LEFT,
  PreferredFoot.BOTH,
]);

// Filter, Sort, Pagination
export const sortOrderSchema = z.enum(["asc", "desc"]).default("asc");
