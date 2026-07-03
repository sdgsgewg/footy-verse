import { getRequestConfig } from "next-intl/server";
import { routing } from "./navigation";

async function getMessages(locale: string) {
  const messages = {
    home: (await import(`./messages/${locale}/home.json`)).default,
    manage: (await import(`./messages/${locale}/manage.json`)).default,
    navigation: (await import(`./messages/${locale}/navigation.json`)).default,
    footer: (await import(`./messages/${locale}/footer.json`)).default,
    theme: (await import(`./messages/${locale}/theme.json`)).default,
    common: (await import(`./messages/${locale}/common.json`)).default,
  };

  return messages;
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
