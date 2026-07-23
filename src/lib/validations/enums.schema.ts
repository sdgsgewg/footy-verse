import { AgeGroup } from "@/enums/AgeGroup";
import { SquadType } from "@/enums/SquadType";
import { TeamCategory } from "@/enums/TeamCategory";
import z from "zod";

export const squadTypeSchema = z.enum([
  SquadType.FIRST_TEAM,
  SquadType.B_TEAM,
  SquadType.RESERVE,
  SquadType.ACADEMY,
]);

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
