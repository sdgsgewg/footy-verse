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
    INDONESIA: "/nation/indonesia/men/players/",
    ARSENAL: "/club/arsenal/men/players/",
  },
  MANAGE: {
    PLAYERS: {
      BASE: "/manage/players",
      CREATE: "/manage/players/create",
      EDIT: "/manage/players/edit",
    },
    CLUBS: {
      BASE: "/manage/clubs",
      CREATE: "/manage/clubs/create",
      EDIT: "/manage/clubs/edit",
    },
    NATIONALITIES: "/manage/nationalities",
    POSITIONS: "/manage/positions",
    SEASONS: "/manage/seasons",
    REGIONS: "/manage/regions",
    COMPETITIONS: {
      BASE: "/manage/competitions",
      CREATE: "/manage/competitions/create",
      EDIT: "/manage/competitions/edit",
    },
  },
};
