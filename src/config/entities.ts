import { ROUTES } from "@/constants/routes";
import { STORAGE_BUCKETS } from "@/lib/storage";
import {
  Flag,
  Goal,
  LucideIcon,
  Map,
  Network,
  Shield,
  Trophy,
  Users,
} from "lucide-react";
import z from "zod";

interface EntityConfig {
  table: string;
  label: string;
  dashboardRoute?: string;
  icon?: LucideIcon;
  storageBucket?: string;
  activityType: string;
}

export const ENTITY_CONFIG = {
  club: {
    table: "clubs",
    label: "Club",
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.CLUBS.BASE,
    icon: Shield,
    storageBucket: STORAGE_BUCKETS.CLUBS,
    activityType: "CLUB",
  },

  clubTeam: {
    table: "club_teams",
    label: "Club Team",
    activityType: "CLUB_TEAM",
  },

  nationality: {
    table: "nationalities",
    label: "Nationality",
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE,
    icon: Flag,
    storageBucket: STORAGE_BUCKETS.NATIONALITIES,
    activityType: "NATIONALITY",
  },

  nationalTeam: {
    table: "national_teams",
    label: "National Team",
    activityType: "NATIONAL_TEAM",
  },

  position: {
    table: "positions",
    label: "Position",
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.POSITIONS.BASE,
    icon: Goal,
    activityType: "POSITION",
  },

  positionCategory: {
    table: "position_categories",
    label: "Position Category",
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.POSITIONS.CATEGORIES.BASE,
    activityType: "POSITION_CATEGORY",
  },

  player: {
    table: "players",
    label: "Player",
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE,
    icon: Users,
    storageBucket: STORAGE_BUCKETS.PLAYERS,
    activityType: "PLAYER",
  },

  playerPosition: {
    table: "player_positions",
    label: "Player Position",
    activityType: "PLAYER_POSITION",
  },

  playerNationality: {
    table: "player_nationalities",
    label: "Player Nationality",
    activityType: "PLAYER_NATIONALITY",
  },

  playerCareer: {
    table: "player_careers",
    label: "Player career",
    activityType: "PLAYER_CAREER",
  },

  playerClubTeamCareer: {
    table: "player_club_team_careers",
    label: "Player club team career",
    activityType: "PLAYER_CLUB_TEAM_CAREER",
  },

  playerNationalTeamCareer: {
    table: "player_national_team_careers",
    label: "Player national team career",
    activityType: "PLAYER_NATIONAL_TEAM_CAREER",
  },

  playerContract: {
    table: "player_contracts",
    label: "Player contract",
    activityType: "PLAYER_CONTRACT",
  },

  playerShirtNumber: {
    table: "player_shirt_numbers",
    label: "Player shirt number",
    activityType: "PLAYER_SHIRT_NUMBER",
  },

  playerTransfer: {
    table: "player_transfers",
    label: "Player Transfer",
    activityType: "PLAYER_TRANSFER",
  },

  region: {
    table: "regions",
    label: "Region",
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.REGIONS.BASE,
    icon: Map,
    activityType: "REGION",
  },

  confederation: {
    table: "confederations",
    label: "Confederation",
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.CONFEDERATIONS.BASE,
    icon: Network,
    activityType: "CONFEDERATION",
  },

  competitionCategory: {
    table: "competition_categories",
    label: "Competition Category",
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.COMPETITIONS.CATEGORIES,
    activityType: "COMPETITION_CATEGORY",
  },

  competitionScope: {
    table: "competition_scopes",
    label: "Competition Scope",
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.COMPETITIONS.SCOPES,
    activityType: "COMPETITION_SCOPE",
  },

  competition: {
    table: "competitions",
    label: "Competition",
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.COMPETITIONS.BASE,
    icon: Trophy,
    storageBucket: STORAGE_BUCKETS.COMPETITIONS,
    activityType: "COMPETITION",
  },

  competitionSeason: {
    table: "competition_seasons",
    label: "Competition Season",
    activityType: "COMPETITION_SEASON",
  },

  activityLog: {
    table: "activity_logs",
    label: "Activity Log",
    activityType: "ACTIVITY_LOG",
  },
} as const satisfies Record<string, EntityConfig>;

export type Entity = keyof typeof ENTITY_CONFIG;

export type EntityTable = (typeof ENTITY_CONFIG)[Entity]["table"];

export type EntityLabel = (typeof ENTITY_CONFIG)[Entity]["label"];

export type ActivityEntityType = (typeof ENTITY_CONFIG)[Entity]["activityType"];

export const activityEntityTypeSchema = z.enum(
  Object.values(ENTITY_CONFIG).map((entity) => entity.activityType) as [
    ActivityEntityType,
    ...ActivityEntityType[],
  ],
);

// HOW TO USE:
// ENTITY_CONFIG[entity].supportsImage
// or
// ENTITY_CONFIG.club.storageBucket
