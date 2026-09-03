import { FeaturedPlayersSection, HeroSection, QuickNavigationSection } from "@/components/home";

interface Section {
  name: string;
  element: React.ReactElement;
}

export const homeSections: Section[] = [
  { name: "hero", element: <HeroSection /> },
  { name: "quickNavigation", element: <QuickNavigationSection /> },
  { name: "featuredPlayers", element: <FeaturedPlayersSection /> },
] as const;

export type HomeSectionName = (typeof homeSections)[number]["name"];
