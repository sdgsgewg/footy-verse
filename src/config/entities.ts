import { ROUTES } from "@/constants/routes";
import { STORAGE_BUCKETS } from "@/lib/storage";
import z from "zod";

interface EntityConfig {
  table: string;
  label: string;
  activityType: string;
  supportsImage: boolean;
  supportsSlug: boolean;
  dashboardRoute?: string;
  storageBucket?: string;
  imageFolder?: string;
}

export const ENTITY_CONFIG = {
  club: {
    table: "clubs",
    label: "Club",
    activityType: "CLUB",
    supportsImage: true,
    supportsSlug: true,
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.CLUBS.BASE,
    storageBucket: STORAGE_BUCKETS.CLUBS,
    imageFolder: "clubs",
  },

  clubTeam: {
    table: "club_teams",
    label: "Club Team",
    activityType: "CLUB_TEAM",
    supportsImage: false,
    supportsSlug: false,
  },

  nationality: {
    table: "nationalities",
    label: "Nationality",
    activityType: "NATIONALITY",
    supportsImage: true,
    supportsSlug: true,
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.NATIONALITIES.BASE,
    storageBucket: STORAGE_BUCKETS.NATIONALITIES,
    imageFolder: "nationalities",
  },

  nationalTeam: {
    table: "national_teams",
    label: "National Team",
    activityType: "NATIONAL_TEAM",
    supportsImage: false,
    supportsSlug: false,
  },

  position: {
    table: "positions",
    label: "Position",
    activityType: "POSITION",
    supportsImage: false,
    supportsSlug: true,
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.POSITIONS.BASE,
  },

  positionCategory: {
    table: "position_categories",
    label: "Position Category",
    activityType: "POSITION_CATEGORY",
    supportsImage: false,
    supportsSlug: true,
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.POSITIONS.CATEGORIES.BASE,
  },

  player: {
    table: "players",
    label: "Player",
    activityType: "PLAYER",
    supportsImage: true,
    supportsSlug: true,
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE,
    storageBucket: STORAGE_BUCKETS.PLAYERS,
    imageFolder: "players",
  },

  playerPosition: {
    table: "player_positions",
    label: "Player Position",
    activityType: "PLAYER_POSITION",
    supportsImage: false,
    supportsSlug: false,
  },

  playerNationality: {
    table: "player_nationalities",
    label: "Player Nationality",
    activityType: "PLAYER_NATIONALITY",
    supportsImage: false,
    supportsSlug: false,
  },

  playerCareer: {
    table: "player_careers",
    label: "Player career",
    activityType: "PLAYER_CAREER",
    supportsImage: false,
    supportsSlug: false,
  },

  playerClubTeamCareer: {
    table: "player_club_team_careers",
    label: "Player club team career",
    activityType: "PLAYER_CLUB_TEAM_CAREER",
    supportsImage: false,
    supportsSlug: false,
  },

  playerNationalTeamCareer: {
    table: "player_national_team_careers",
    label: "Player national team career",
    activityType: "PLAYER_NATIONAL_TEAM_CAREER",
    supportsImage: false,
    supportsSlug: false,
  },

  playerContract: {
    table: "player_contracts",
    label: "Player contract",
    activityType: "PLAYER_CONTRACT",
    supportsImage: false,
    supportsSlug: false,
  },

  playerShirtNumber: {
    table: "player_shirt_numbers",
    label: "Player shirt number",
    activityType: "PLAYER_SHIRT_NUMBER",
    supportsImage: false,
    supportsSlug: false,
  },

  playerTransfer: {
    table: "player_transfers",
    label: "Player Transfer",
    activityType: "PLAYER_TRANSFER",
    supportsImage: false,
    supportsSlug: false,
  },

  region: {
    table: "regions",
    label: "Region",
    activityType: "REGION",
    supportsImage: false,
    supportsSlug: true,
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.REGIONS.BASE,
  },

  confederation: {
    table: "confederations",
    label: "Confederation",
    activityType: "CONFEDERATION",
    supportsImage: true,
    supportsSlug: true,
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.CONFEDERATIONS.BASE,
  },

  competitionCategory: {
    table: "competition_categories",
    label: "Competition Category",
    activityType: "COMPETITION_CATEGORY",
    supportsImage: false,
    supportsSlug: true,
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.COMPETITIONS.CATEGORIES,
  },

  competitionScope: {
    table: "competition_scopes",
    label: "Competition Scope",
    activityType: "COMPETITION_SCOPE",
    supportsImage: false,
    supportsSlug: true,
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.COMPETITIONS.SCOPES,
  },

  competition: {
    table: "competitions",
    label: "Competition",
    activityType: "COMPETITION",
    supportsImage: true,
    supportsSlug: true,
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.COMPETITIONS.BASE,
    storageBucket: STORAGE_BUCKETS.COMPETITIONS,
    imageFolder: "competitions",
  },

  competitionSeason: {
    table: "competition_seasons",
    label: "Competition Season",
    activityType: "COMPETITION_SEASON",
    supportsImage: false,
    supportsSlug: true,
  },

  activityLog: {
    table: "activity_logs",
    label: "Activity Log",
    activityType: "ACTIVITY_LOG",
    supportsImage: false,
    supportsSlug: false,
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
