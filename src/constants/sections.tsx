import { HeroSection } from "@/components/home";
import QuickNavigation from "@/components/home/quick-navigation/QuickNavigationSection";

interface Section {
  name: string;
  element: React.ReactElement;
}

export const homeSections: Section[] = [
  { name: "hero", element: <HeroSection /> },
  { name: "quickNavigation", element: <QuickNavigation /> },
] as const;

export type HomeSectionName = (typeof homeSections)[number]["name"];
