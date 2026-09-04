import {
  FeaturedPlayersSection,
  HeroSection,
  QuickNavigationSection,
} from "@/components/home";

export const homeSections = [
  { name: "hero", element: <HeroSection /> },
  { name: "quickNavigation", element: <QuickNavigationSection /> },
  { name: "featuredPlayers", element: <FeaturedPlayersSection /> },
];

export type HomeSectionName = (typeof homeSections)[number]["name"];
