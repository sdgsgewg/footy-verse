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
      NATIONALITIES: "/dashboard/nationalities",
      POSITIONS: "/dashboard/positions",
      SEASONS: "/dashboard/seasons",
      REGIONS: "/dashboard/regions",
      COMPETITIONS: {
        BASE: "/dashboard/competitions",
        CREATE: "/dashboard/competitions/create",
      },
    },
    SYSTEM: {
      USERS: {
        BASE: "/dashboard/users",
        CREATE: "/dashboard/users/create",
      },
      ROLES: "/dashboard/roles",
    },
  },
};
