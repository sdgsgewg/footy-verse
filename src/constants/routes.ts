export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    EMAIL_VERIFICATION: "/email-verification",
    COMPLETE_PROFILE: "/complete-profile",
  },
  HOME: "/",
  TEAMS: {
    BASE: "/teams",
    CLUBS: "/teams/clubs",
    NATIONAL_TEAMS: "/teams/national-teams",
    INDONESIA: "/nation/indonesia/men/players/",
    ARSENAL: "/club/arsenal/men/players/",
  },
  DASHBOARD: {
    BASE: "/dashboard",
    CONTENT: {
      PLAYERS: {
        BASE: "/dashboard/players",
        CREATE: "/dashboard/players/create",
      },
      CLUBS: {
        BASE: "/dashboard/clubs",
        CREATE: "/dashboard/clubs/create",
      },
      NATIONALITIES: {
        BASE: "/dashboard/nationalities",
        CREATE: "/dashboard/nationalities/create",
      },
      POSITIONS: {
        BASE: "/dashboard/positions",
        CREATE: "/dashboard/positions/create",
        CATEGORIES: {
          BASE: "/dashboard/positions/categories",
          CREATE: "/dashboard/positions/categories/create",
        },
      },
      SEASONS: {
        BASE: "/dashboard/seasons",
        CREATE: "/dashboard/seasons/create",
      },
      REGIONS: {
        BASE: "/dashboard/regions",
        CREATE: "/dashboard/regions/create",
      },
      COMPETITIONS: {
        BASE: "/dashboard/competitions",
        CREATE: "/dashboard/competitions/create",
        CATEGORIES: "/dashboard/competitions/categories",
      },
    },
    SYSTEM: {
      USERS: {
        BASE: "/dashboard/users",
        CREATE: "/dashboard/users/create",
      },
      ROLES: {
        BASE: "/dashboard/roles",
        CREATE: "/dashboard/roles/create",
      },
    },
  },
};
