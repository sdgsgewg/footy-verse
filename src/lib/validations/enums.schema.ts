import { AgeGroup } from "@/enums/AgeGroup";
import { CareerType } from "@/enums/CareerType";
import { CompetitionSeasonStatus } from "@/enums/CompetitionSeasonStatus";
import { CompetitionSquadPlayerStatus } from "@/enums/CompetitionSquadPlayerStatus";
import { Gender } from "@/enums/Gender";
import { ParticipantType } from "@/enums/ParticipantType";
import { PreferredFoot } from "@/enums/PreferredFoot";
import { RegionType } from "@/enums/RegionType";
import { SquadType } from "@/enums/SquadType";
import { NationalTeamType } from "@/enums/NationalTeamType";
import { TransferType } from "@/enums/TransferType";
import z from "zod";
import { ActivityLogAction } from "@/enums/ActivityLogAction";

// Shared

export const genderSchema = z.enum([Gender.MEN, Gender.WOMEN]);

// Club

export const clubSortBySchema = z.enum(["name", "nation", "created_at"]);

// Club Team

export const squadTypeSchema = z.enum([
  SquadType.FIRST_TEAM,
  SquadType.B_TEAM,
  SquadType.RESERVE,
  SquadType.ACADEMY,
]);

// Nationality

export const nationalitySortBySchema = z.enum(["name", "created_at"]);

// Both Club and National Team

export const nationalTeamTypeSchema = z.enum([
  NationalTeamType.STANDARD,
  NationalTeamType.OLYMPIC,
]);

export const ageGroupSchema = z.enum([
  AgeGroup.SENIOR,
  AgeGroup.U23,
  AgeGroup.U21,
  AgeGroup.U20,
  AgeGroup.U19,
  AgeGroup.U18,
  AgeGroup.U17,
  AgeGroup.U16,
  AgeGroup.YOUTH,
]);

// Position Related

// Position Category

export const positionCategorySortBySchema = z.enum(["name", "created_at"]);

// Position

export const positionSortBySchema = z.enum(["name", "created_at"]);

//Player

export const playerSortBySchema = z.enum(["shortName", "dob", "marketValue"]);

export const prefFootSchema = z.enum(PreferredFoot);

// Player Career

export const careerTypeSchema = z.enum([
  CareerType.CLUB,
  CareerType.NATIONAL_TEAM,
]);

// Player Shirt Number

export const playerShirtNumberSortBySchema = z.enum(["start_date", "end_date"]);

// Player Club Career

export const transferTypeSchema = z.enum([
  TransferType.TRANSFER,
  TransferType.LOAN,
  TransferType.LOAN_RETURN,
  TransferType.FREE,
  TransferType.RELEASED,
  TransferType.YOUTH_PROMOTION,
  TransferType.RETIRED,
]);

// Player Transfer

export const playerTransferSortBySchema = z.enum([
  "transfer_fee",
  "transfer_date",
]);

// Player National Team Career

// Season

export const seasonSortBySchema = z.enum(["name", "created_at"]);

// Region

export const regionTypeSchema = z.enum([
  RegionType.CONTINENT,
  RegionType.SUBREGION,
  "",
]);

export const regionSortBySchema = z.enum(["name", "created_at"]);

// Confederation

export const confederationSortBySchema = z.enum(["name", "created_at"]);

// Competition Related

// Competition Category

export const competitionCategorySortBySchema = z.enum(["name", "created_at"]);

// Competition Scope

export const competitionScopeSortBySchema = z.enum(["name", "created_at"]);

// Competition

export const participantTypeSchema = z.enum([
  ParticipantType.CLUB,
  ParticipantType.NATIONAL_TEAM,
]);

export const competitionSortBySchema = z.enum(["name", "created_at"]);

// Competition Season

export const competitionSeasonStatusSchema = z.enum([
  CompetitionSeasonStatus.UPCOMING,
  CompetitionSeasonStatus.ONGOING,
  CompetitionSeasonStatus.COMPLETED,
  CompetitionSeasonStatus.CANCELLED,
]);

export const competitionSeasonSortBySchema = z.enum(["name", "created_at"]);

// Competition Squad Player

export const competitionSquadPlayerStatusSchema = z.enum([
  CompetitionSquadPlayerStatus.REGISTERED,
  CompetitionSquadPlayerStatus.WITHDRAWN,
  CompetitionSquadPlayerStatus.REPLACED,
]);

// Activity Log

export const activityLogActionSchema = z.enum([
  ActivityLogAction.CREATE,
  ActivityLogAction.UPDATE,
  ActivityLogAction.DELETE,
]);

export const activityLogSortBySchema = z.enum(["created_at"]);

// Filter, Sort, Pagination
export const sortOrderSchema = z.enum(["asc", "desc"]);
