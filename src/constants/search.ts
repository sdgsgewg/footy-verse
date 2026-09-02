import { SearchEntityType, SearchResult } from "@/types/search";
import { ROUTES } from "./routes";

export const SEARCH_ENTITY_CONFIG: Record<
  SearchEntityType,
  {
    label: string;
    route: (result: SearchResult) => string;
  }
> = {
  player: {
    label: "Players",
    route: (result) => `${ROUTES.PLAYERS}/${result.slug}`,
  },

  club: {
    label: "Clubs",
    route: (result) => `${ROUTES.CLUBS}/${result.slug}`,
  },

  nationality: {
    label: "Nations",
    route: (result) => `${ROUTES.NATIONALITIES}/${result.slug}`,
  },

  competition: {
    label: "Competitions",
    route: (result) => `${ROUTES.COMPETITIONS}/${result.slug}`,
  },
};
