import {
  FeaturedPlayersSection,
  HeroSection,
  LatestTransfersSection,
  QuickNavigationSection,
} from "@/components/public/home";

export const homeSections = [
  { name: "hero", element: <HeroSection /> },
  { name: "quickNavigation", element: <QuickNavigationSection /> },
  { name: "featuredPlayers", element: <FeaturedPlayersSection /> },
  { name: "latestTransfers", element: <LatestTransfersSection /> },
];

export type HomeSectionName = (typeof homeSections)[number]["name"];
