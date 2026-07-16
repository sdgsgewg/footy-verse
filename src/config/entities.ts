import { ROUTES } from "@/constants/routes";
import { STORAGE_BUCKETS } from "@/lib/storage";

interface EntityConfig {
  table: string;
  label: string;
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
    supportsImage: true,
    supportsSlug: true,
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.CLUBS.BASE,
    storageBucket: STORAGE_BUCKETS.CLUBS,
    imageFolder: "clubs",
  },

  nationality: {
    table: "nationalities",
    label: "Nationality",
    supportsImage: true,
    supportsSlug: true,
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.NATIONALITIES,
    storageBucket: STORAGE_BUCKETS.NATIONALITIES,
    imageFolder: "nationalities",
  },

  position: {
    table: "positions",
    label: "Position",
    supportsImage: false,
    supportsSlug: true,
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.POSITIONS,
  },

  player: {
    table: "players",
    label: "Player",
    supportsImage: true,
    supportsSlug: true,
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE,
    storageBucket: STORAGE_BUCKETS.PLAYERS,
    imageFolder: "players",
  },

  playerPosition: {
    table: "player_positions",
    label: "Player Position",
    supportsImage: false,
    supportsSlug: false,
  },

  playerNationalTeam: {
    table: "player_national_teams",
    label: "Player Position",
    supportsImage: false,
    supportsSlug: false,
  },

  playerCareer: {
    table: "player_careers",
    label: "Player career",
    supportsImage: false,
    supportsSlug: false,
  },

  playerContract: {
    table: "player_contracts",
    label: "Player contract",
    supportsImage: false,
    supportsSlug: false,
  },

  playerShirtNumber: {
    table: "player_shirt_numbers",
    label: "Player shirt number",
    supportsImage: false,
    supportsSlug: false,
  },

  transfer: {
    table: "transfers",
    label: "Transfer",
    supportsImage: false,
    supportsSlug: false,
  },

  season: {
    table: "seasons",
    label: "Season",
    supportsImage: false,
    supportsSlug: false,
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.SEASONS,
  },

  region: {
    table: "regions",
    label: "Region",
    supportsImage: false,
    supportsSlug: true,
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.REGIONS,
  },

  competition: {
    table: "competitions",
    label: "Competition",
    supportsImage: true,
    supportsSlug: true,
    dashboardRoute: ROUTES.DASHBOARD.CONTENT.COMPETITIONS.BASE,
    storageBucket: STORAGE_BUCKETS.COMPETITIONS,
    imageFolder: "competitions",
  },
} as const satisfies Record<string, EntityConfig>;

export type Entity = keyof typeof ENTITY_CONFIG;

export type EntityTable = (typeof ENTITY_CONFIG)[Entity]["table"];
export type EntityLabel = (typeof ENTITY_CONFIG)[Entity]["label"];

// HOW TO USE:
// ENTITY_CONFIG[entity].supportsImage
// or
// ENTITY_CONFIG.club.storageBucket
