import { getRequestConfig } from "next-intl/server";
import { routing } from "./navigation";

async function getMessages(locale: string) {
  const theme = (await import(`./messages/${locale}/theme.json`)).default;
  const lang = (await import(`./messages/${locale}/lang.json`)).default;
  const navigation = (await import(`./messages/${locale}/navigation.json`))
    .default;
  const footer = (await import(`./messages/${locale}/footer.json`)).default;
  const common = (await import(`./messages/${locale}/common.json`)).default;
  const auth = (await import(`./messages/${locale}/auth.json`)).default;
  const entities = (await import(`./messages/${locale}/entities.json`)).default;

  const publicMessages = {
    home: (await import(`./messages/${locale}/public/home.json`)).default,
    teams: (await import(`./messages/${locale}/public/teams.json`)).default,
  };

  const dashboardMessages = {
    home: (await import(`./messages/${locale}/dashboard/home.json`)).default,

    players: (await import(`./messages/${locale}/dashboard/players.json`))
      .default,

    playerCareers: (
      await import(`./messages/${locale}/dashboard/player-careers.json`)
    ).default,

    playerClubTeamCareers: (
      await import(`./messages/${locale}/dashboard/player-club-team-careers.json`)
    ).default,

    playerNationalTeamCareers: (
      await import(
        `./messages/${locale}/dashboard/player-national-team-careers.json`
      )
    ).default,

    playerTransfers: (
      await import(`./messages/${locale}/dashboard/player-transfers.json`)
    ).default,

    playerShirtNumbers: (
      await import(`./messages/${locale}/dashboard/player-shirt-numbers.json`)
    ).default,

    clubs: (await import(`./messages/${locale}/dashboard/clubs.json`)).default,

    clubTeams: (await import(`./messages/${locale}/dashboard/club-teams.json`))
      .default,

    nationalities: (
      await import(`./messages/${locale}/dashboard/nationalities.json`)
    ).default,

    nationalTeams: (
      await import(`./messages/${locale}/dashboard/national-teams.json`)
    ).default,

    positions: (await import(`./messages/${locale}/dashboard/positions.json`))
      .default,

    positionCategories: (
      await import(`./messages/${locale}/dashboard/position-categories.json`)
    ).default,

    seasons: (await import(`./messages/${locale}/dashboard/seasons.json`))
      .default,

    regions: (await import(`./messages/${locale}/dashboard/regions.json`))
      .default,

    confederations: (
      await import(`./messages/${locale}/dashboard/confederations.json`)
    ).default,

    competitionCategories: (
      await import(`./messages/${locale}/dashboard/competition-categories.json`)
    ).default,

    competitionScopes: (
      await import(`./messages/${locale}/dashboard/competition-scopes.json`)
    ).default,

    competitions: (
      await import(`./messages/${locale}/dashboard/competitions.json`)
    ).default,
  };

  return {
    theme,
    lang,
    navigation,
    footer,
    common,
    auth,
    public: publicMessages,
    dashboard: dashboardMessages,
    entities,
  };
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "en" | "id")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: await getMessages(locale),
  };
});
